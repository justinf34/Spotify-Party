import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import RoomSelect from "./RoomSelect";
import Room from "./Room";

export class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RoomSelect} />
          <Route exact path="/room/:roomID" component={Room} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
