import React from "react";

import Emoji from "../Components/Emoji";
import BigButton from "../Components/BigButton";
import { Typography, TextField } from "@material-ui/core";

import PropTypes from "prop-types";

export default function LoggedIn(props) {
  console.log(props.displayName);
  return (
    <React.Fragment>
      <div style={{ flex: 1 }}>
        <Typography variant="h5">
          <b>{props.displayName}</b> you are now logged in <Emoji symbol="😘" />
        </Typography>
      </div>

      <div style={{ flex: 1 }}>
        <BigButton label="Create New Room" onClick={props.onCreateRoom} />
        <Typography variant="h5">OR </Typography>{" "}
        <form noValidate autoComplete="off">
          <TextField
            id="roomNumber"
            label="Join Room #"
            variant="outlined"
            color="secondary"
          />
        </form>
      </div>
    </React.Fragment>
  );
}

LoggedIn.propTypes = {
  displayName: PropTypes.string.isRequired,
};
