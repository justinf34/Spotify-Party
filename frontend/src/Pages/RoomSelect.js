import React, { Component } from "react";

import { AuthContext } from "../Auth/Context";

import Emoji from "../Components/Emoji";
import BigButton from "../Components/BigButton";
import { Typography, TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

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

  handleClose(event, reason) {
    this.setState({ alertOpen: false });
  }

  onCreateRoom() {
    this.props.onCreateRoom("hello");
    this.setState({
      loaderOn: true,
    });
  }

  // Handler on join room attempt
  onJoinRoom(res) {
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

  // Handler when the user wants to log out
  onLogout() {
    this.props.onLogout(); // Disconnect socket manually
    this.context.logout(); // clear cookies and logout user
  }

  componentDidMount() {
    this.props.joinRoomHandler(this.onJoinRoom);
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ flex: 1 }}>
          <Typography variant="h5">
            <b>{this.context.user}</b> you are now logged in{" "}
            <Emoji symbol="😘" />
          </Typography>
          <BigButton label="Logout" onClick={this.onLogout} />
        </div>

        <div style={{ flex: 1 }}>
          {this.state.joiningRoom ? (
            <React.Fragment>
              <img src={require("../assets/loading.svg")} alt="loading..." />
              <Typography variant="h5">Joining Room...</Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <BigButton label="Create New Room" onClick={this.onCreateRoom} />
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
      </React.Fragment>
    );
  }
}

export default RoomSelect;
