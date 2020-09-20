import React, { Component } from "react";

import { AuthContext } from "../Auth/Context";

import Emoji from "../Components/Emoji";
import RoundedBtn1 from "../Components/RoundedBtn1";
import { Typography, TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

/**
 * Alert Notification Component
 * @param {object} props
 */
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class RoomSelect extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      loaderOn: false,
      alertOpen: false,
      input: "",
    };

    this.handleClose = this.handleClose.bind(this);
    this.onInput = this.onInput.bind(this);

    this.onJoin = this.onJoin.bind(this);
    this.onCreateRoom = this.onCreateRoom.bind(this);
    this.onJoinRes = this.onJoinRes.bind(this);

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    this.props.registerJoinHandler(this.onJoinRes);
  }

  componentWillUnmount() {
    this.props.unregisterJoinHandler(); // Disable joinRoomHandler
  }

  // Handler for closing error notification
  handleClose(event, reason) {
    this.setState({ alertOpen: false });
  }

  // Keep track of the current input of the client in their message field
  onInput(e) {
    this.setState({
      input: e.traget.value,
    });
  }

  // Handler request of room creation by the client
  onCreateRoom() {
    this.props.onCreateRoom(this.context.user);
    this.setState({
      loaderOn: true,
    });
  }

  // Handler when user wants to join a room
  onJoin() {
    this.props.onJoin(this.state.input, this.context.user);
    this.setState({
      loaderOn: true,
    });
  }

  // Handler for join/create response
  onJoinRes(res) {
    console.log(`Join Response => ${res}`);
    if (res) {
      this.props.history.replace({
        pathname: `/room/${res.room_id}`,
        state: { host: res.host },
      });
    } else {
      this.setState({
        loaderOn: false,
        alertOpen: true,
      });
    }
  }

  // Handler for client logout
  onLogout() {
    this.props.onDisconnect(); // Disconnect socket manually
    this.context.logout(); // clear cookies and logout user
  }

  render() {
    return (
      <div className="RoomSelectLayout">
        <div style={{ flex: 1 }}>
          <Typography variant="h5">
            <b>{this.context.user}</b> you are now logged in{" "}
            <Emoji symbol="😘" />
          </Typography>
          <RoundedBtn1 label="Logout" onClick={this.onLogout} />
        </div>

        <div style={{ flex: 1 }}>
          {this.state.joiningRoom ? (
            <React.Fragment>
              <img src={require("../assets/loading.svg")} alt="loading..." />
              <Typography variant="h5">Joining Room...</Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <RoundedBtn1
                label="Create New Room"
                onClick={this.onCreateRoom}
              />
              <Typography variant="h5">OR </Typography>{" "}
              <form noValidate autoComplete="off">
                <TextField
                  id="roomNumber"
                  label="Join Room #"
                  variant="outlined"
                  color="secondary"
                  onChange={this.onInput}
                  value={this.state.input}
                  onKeyPress={(e) => (e.key === "Enter" ? this.onJoin : null)}
                />
              </form>
            </React.Fragment>
          )}
        </div>

        <Snackbar
          open={this.state.alertOpen}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert onClose={this.handleClose} severity="error">
            Cannot Join/Create Server <Emoji symbol="😓" />
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default RoomSelect;
