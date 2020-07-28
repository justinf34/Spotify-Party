import React from "react";
import Emoji from "./Emoji";
import { Typography } from "@material-ui/core";
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
    <div>
      <Typography variant="subtitle1">
        <b>{props.displayName}</b> you are now logged in <Emoji symbol="😘" />
      </Typography>

      <MyButton variant="contained">Logout</MyButton>
    </div>
  );
}
