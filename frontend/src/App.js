import React from "react";
import "./App.css";
import { useAuth } from "./Auth/Context";

import { Typography } from "@material-ui/core";

import Emoji from "./Components/Emoji";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

export default function App() {
  const { loggedIn } = useAuth();
  return (
    <div className="App">
      <header className="MainHeader">
        <Typography variant="h2" gutterBottom>
          Spotify Party <Emoji symbol="🥳" />
          <Emoji symbol="🎵" />
        </Typography>
      </header>
      <div className="MainBody">{loggedIn ? <Home /> : <Login />}</div>
    </div>
  );
}
