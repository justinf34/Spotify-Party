import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../Auth/PrivateRoute";

import RoomSelect from "./RoomSelect";
import Room from "./Room";

import socket from "../Utils/Socket";

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: socket(),
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <RoomSelect
                {...props}
                onCreateRoom={this.state.client.createRoom}
                joinRoomHandler={this.state.client.joinRoomHandler}
                onLogout={this.state.client.disconnect}
              />
            )}
          />
          <Route exact path="/room/:roomID" component={Room} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
