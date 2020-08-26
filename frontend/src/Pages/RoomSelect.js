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
    };

    this.onCreateRoom = this.onCreateRoom.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onJoinRoom = this.onJoinRoom.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  // Handler for closing error notification
  handleClose(event, reason) {
    this.setState({ alertOpen: false });
  }

  // Handler request of room creation by the client
  onCreateRoom() {
    this.props.onCreateRoom(this.context.user);
    this.setState({
      loaderOn: true,
    });
  }

  // Handler on join room attempt
  onJoinRoom(res) {
    console.log("joinRoom Received!");
    console.log(res);
    if (res) {
      // this.props.history.replace({
      //   pathname: `/room/${res.room_id}`,
      //   state: { host: res.host },
      // });
      this.props.history.push("/room/8888");
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

  componentDidMount() {
    this.props.registerJoinHandler(this.onJoinRoom);
  }

  componentWillUnmount() {
    this.props.unregisterJoinHandler(); // Disable joinRoomHandler
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
