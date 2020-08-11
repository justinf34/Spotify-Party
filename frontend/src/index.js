import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./Auth/Context";

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

ReactDOM.render(
  <AuthProvider>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </AuthProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
