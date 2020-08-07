import React, { Component } from "react";
import "./App.css";

import {
  Typography,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";

import Emoji from "./Components/Emoji";
import Login from "./Pages/Login";
import LoggedIn from "./Pages/LoggedIn";
import Room from "./Pages/Room";

import { getHashParams } from "./getHashParams";

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

    const params = getHashParams();
    const accessToken = params.access_token;
    this.socket = null;

    const accessTokenTest = window.localStorage.getItem("SP_AT");
    console.log(accessTokenTest);

    this.state = {
      access_token: accessToken,
      loggedIn: accessToken ? true : false,
      displayName: null,
      image: null,
      room: null,
      host: true,
    };

    if (accessToken) {
      spotifyWebApi.setAccessToken(params.access_token); // Need to remove access token when logging out
      // this.socket = io(SOCKET_IO_URL);
    }

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
    // this.socket.on("connect", (data) => {
    //   console.log("You have connected to the main server");
    //   console.log(data);
    // });

    /**
     * Handler when user successfuly created a room
     */
    // this.socket.on("roomCreated", (roomID) => {
    //   console.log(roomID);
    // });
  }

  /**
   * Handles when user decides to create a new room
   */
  createRoomHandler() {
    // this.socket.emit("createNewRoom", this.socket.id);
    this.setState({ room: "Test" });
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
              Spotify Party <Emoji symbol="🥳" />
              <Emoji symbol="🎵" />
            </Typography>
          </header>
          <div className="MainBody">
            {!this.state.loggedIn ? (
              <Login />
            ) : this.state.room ? (
              <Room />
            ) : (
              <LoggedIn
                displayName={this.state.displayName}
                onCreateRoom={this.createRoomHandler}
              />
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
