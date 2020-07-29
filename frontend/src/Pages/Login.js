import React from "react";
import { Typography } from "@material-ui/core";
import Emoji from "../Components/Emoji";
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

export default function Login() {
  return (
    <div className="LoginPage">
      <Typography variant="subtitle1">
        To join the party, please login using your spotify account{" "}
        <Emoji symbol="😊" />
      </Typography>
      <Typography variant="subtitle2">
        <b>Only premium users!!!</b> <Emoji symbol="🧐" />
      </Typography>
      <MyButton variant="contained" href="http://localhost:8888/login">
        Login
      </MyButton>
    </div>
  );
}
