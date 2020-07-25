import React from "react";
import "./App.css";
import "./Components/Emoji";
import {
  Typography,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import Emoji from "./Components/Emoji";
import Login from "./Components/Login";

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
});

function App() {
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
          <Login />
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
