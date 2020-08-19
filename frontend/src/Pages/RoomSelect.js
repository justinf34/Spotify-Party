import React from "react";
import { useAuth } from "../Auth/Context";

import Emoji from "../Components/Emoji";
import BigButton from "../Components/BigButton";
import { Typography, TextField } from "@material-ui/core";

export default function RoomSelect(props) {
  const { user, logout } = useAuth();

  const onCreateRoom = () => {
    props.history.push(`/room/1234`);
  };

  return (
    <React.Fragment>
      <div style={{ flex: 1 }}>
        <Typography variant="h5">
          <b>{user}</b> you are now logged in <Emoji symbol="😘" />
        </Typography>
        <BigButton label="Logout" onClick={logout} />
      </div>

      <div style={{ flex: 1 }}>
        <BigButton label="Create New Room" onClick={onCreateRoom} />
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
