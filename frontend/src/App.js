import React, { Suspense } from "react";
import "./App.css";
import { useAuth } from "./Auth/Context";

import { Typography } from "@material-ui/core";
import PrivateRoute from "./Auth/PrivateRoute";

import Emoji from "./Components/Emoji";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
const Login = React.lazy(() => import("./Pages/Login"));
const Main = React.lazy(() => import("./Pages/Main"));

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
      <div className="MainBody">
        <Suspense
          fallback={
            <div>
              <img src={require("./assets/loading.svg")} alt="loading..." />
            </div>
          }
        >
          {/* <BrowserRouter>
            <Switch>
              <PrivateRoute exact path="/" component={Main} />
              <Route exact paht="/login" component={Login} />
            </Switch>
          </BrowserRouter> */}
          {loggedIn ? <Main /> : <Login />}
        </Suspense>
      </div>
    </div>
  );
}
