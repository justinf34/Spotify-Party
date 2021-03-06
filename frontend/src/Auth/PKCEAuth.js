import { authConfig } from "../Auth/AuthConfig";
import { generateRandomString, generateCodeChallenge } from "../Utils/Helper";
import querystring from "querystring";

/////////////////////////////////////////////////////////////////////////
// PKCE Auth flow functions
/////////////////////////////////////////////////////////////////////////
/**
 * Initiate the PKCE Auth Code flow by
 * creating the state, code verifier,
 * code challenge, and redirective user to the
 * Spotify auth page
 * src: https://github.com/aaronpk/pkce-vanilla-js/blob/master/index.html
 */
async function authUser() {
  const state = generateRandomString();
  localStorage.setItem("pkce_state", state);

  const code_verifier = generateRandomString();
  localStorage.setItem("pkce_code_verifier", code_verifier);

  const code_challenege = await generateCodeChallenge(code_verifier);

  const url =
    authConfig.auth_endpoint +
    querystring.stringify({
      response_type: "code",
      client_id: authConfig.client_id,
      state: state,
      redirect_uri: authConfig.redirect_uri,
      code_challenge: code_challenege,
      code_challenege_method: "S256",
    });

  window.location = url;
}

/**
 * Handling teh redirect back from the spotify auth server
 * and get an access token from the token endpoint
 *
 * src: https://github.com/aaronpk/pkce-vanilla-js/blob/master/index.html
 */
