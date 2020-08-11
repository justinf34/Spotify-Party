/**
 * This is an authorization server that performs the Authorization
 * Code oAuth2 flow to authenticate against Spotify accouts
 *
 */

let express = require("express"); // Express web server framework
let request = require("request"); // "Request" library
let cors = require("cors");
let querystring = require("querystring");
let cookieParser = require("cookie-parser");

let codeGenerator = require("./utils/generateRandString");

require("dotenv").config();

// Auth credentials
const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri =
  process.env.REDIRECT_URI || "http://localhost:8888/callback"; // Your redirect uri

let stateKey = "spotify_auth_state";

let app = express();

app.use(cors()).use(cookieParser());

/**
 * Route to initiate login auth flow
 */
app.get("/login", function (req, res) {
  let state = codeGenerator.generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  let scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    //Case when the state does not match
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token,
          refresh_token = body.refresh_token;

        let options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);

          if (body.product !== "premium") {
            res.redirect(
              "/#" +
                querystring.stringify({
                  error: "non_premium",
                })
            );
          } else {
            res.redirect(
              process.env.FRONTEND_URI +
                querystring.stringify({
                  access_token: access_token,
                  refresh_token: refresh_token,
                  user: body.display_name,
                  premium: body.product === "premium" ? true : false,
                })
            );
          }
        });
      } else {
        // Case when there is an invalid token
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

/**
 * Route to get new access token
 */
app.get("/refresh_token", function (req, res) {
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

let port = process.env.PORT || 8888;
console.log(`Listening on port ${port}. Go /login to initiate auth flow`);
app.listen(port);
