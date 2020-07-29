import React from "react";
import Emoji from "../Components/Emoji";
import { Typography, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const MyButton = styled(Button)({
  background: "#1ED761",
  border: 0,
  borderRadius: 25,
  color: "white",
  height: 48,
  padding: "0 50px",
});

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
        <MyButton variant="contained">Create New Room</MyButton>
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
