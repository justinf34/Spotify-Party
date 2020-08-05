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
const SOCKET_IO_URL = "http://localhost:8889"; // Hide this later in frontend

// App theme
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
    this.socket = null;

    if (accessToken) {
      spotifyWebApi.setAccessToken(params.access_token);
      this.socket = io(SOCKET_IO_URL);
    }

    this.state = {
      access_token: accessToken,
      loggedIn: accessToken ? true : false,
      displayName: null,
      image: null,
      room: null,
      host: true,
    };

    this.createRoomHandler = this.createRoomHandler.bind(this);
  }

  /**
   * Uses access token to get user's display name
   */
  async initUser() {
    // Getting user metadata
    const user_data = await spotifyWebApi.getMe();
    this.setState({
      displayName: user_data.display_name,
      image: user_data.images,
    });

    /**
     * When the user is connected to the main server
     */
    this.socket.on("connect", (data) => {
      console.log("You have connected to the main server");
      console.log(data);
    });

    /**
     * Handler when user successfuly created a room
     */
    this.socket.on("roomCreated", (roomID) => {
      console.log(roomID);
    });
  }

  /**
   * Handles when user decides to create a new room
   */
  createRoomHandler() {
    this.socket.emit("createNewRoom", this.socket.id);
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
      this.initUser();
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
            {this.state.loggedIn ? (
              <LoggedIn
                displayName={this.state.displayName}
                onCreateRoom={this.createRoomHandler}
              />
            ) : (
              <Login />
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
