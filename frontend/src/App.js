import React, { Suspense } from "react";
import "./App.css";

import { useAuth } from "./Auth/Context";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Emoji from "./Components/Emoji";
const Login = React.lazy(() => import("./Pages/Login"));
const Main = React.lazy(() => import("./Pages/Main"));

// App theme
const theme = createMuiTheme({
  typography: {
    fontFamily: `"Montserrat", sans-serif`,
  },
});

export default function App() {
  const { loggedIn } = useAuth();
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <header className="MainHeader">
          <Typography variant="h2">
            Spotify Party <Emoji symbol="🥳" />
            <Emoji symbol="🎵" />
          </Typography>
        </header>
        <div className="MainBody">
          <Suspense
            fallback={
              <div>
                <img src={require("./assets/loading.svg")} alt="loading..." />
              </div>
            }
          >
            {loggedIn ? <Main /> : <Login />}
          </Suspense>
        </div>
      </div>
    </MuiThemeProvider>
  );
}
