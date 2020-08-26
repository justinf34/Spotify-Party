import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RoomSelect from "./RoomSelect";
import Room from "./Room";

import socket from "../Utils/Socket";

class Main extends Component {
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
                registerJoinHandler={this.state.client.registerJoinHandler}
                unregisterJoinHandler={this.state.client.unregisterJoinHandler}
                onDisconnect={this.state.client.disconnect}
              />
            )}
          />
          <Route
            exact
            path="/room/:roomID"
            render={(props) => <Room {...props} client={this.state.client} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
