import React, { Component } from "react";
import "./App.css";
import "./Components/Emoji";
import {
  Typography,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import Emoji from "./Components/Emoji";
import Login from "./Pages/Login";
import LoggedIn from "./Pages/LoggedIn";
import Spotify from "spotify-web-api-js";
import io from "socket.io-client";

const spotifyWebApi = new Spotify();
const SOCKET_IO_URL = "http://localhost:8889";
const socket = io(SOCKET_IO_URL);

const theme = createMuiTheme({
  palette: {
    // primary: purple,
    secondary: {
      main: "#1ED761",
    },
  },
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
      access_token: accessToken,
      loggedIn: accessToken ? true : false,
      displayName: null,
      image: null,
      socket: null,
      room: null,
      host: true,
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
    if (this.state.loggedIn) {
      this.getUserData();
    }
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
            {/* {this.state.loggedIn ? (
              <LoggedIn displayName={this.state.displayName} />
            ) : (
              <Login />
            )} */}
            <LoggedIn displayName="pheeg" />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
