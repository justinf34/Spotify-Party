import React, { Component } from "react";
import "./App.css";
import "./Components/Emoji";
import {
  Typography,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import Emoji from "./Components/Emoji";
import Login from "./Components/Login";
import LoggedIn from "./Components/LoggedIn";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const accessToken = params.access_token;

    if (accessToken) {
      spotifyWebApi.setAccessToken(params.access_token);
    }

    this.state = {
      loggedIn: accessToken ? true : false,
      displayName: null,
      image: null,
    };
  }

  /**
   * Uses access token to get user's display name
   */
  getUserData() {
    spotifyWebApi.getMe().then((res) => {
      console.log(res);
      this.setState({
        displayName: res.display_name,
        image: res.images,
      });
    });
  }

  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="MainHeader">
            <Typography variant="h2" gutterBottom>
              Spotify Listen Party <Emoji symbol="🥳" />
              <Emoji symbol="🎵" />
            </Typography>
          </header>
          <div className="MainBody">
            {this.state.loggedIn ? (
              <LoggedIn displayName={this.state.displayName} />
            ) : (
              <Login />
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
