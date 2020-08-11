import React from "react";

import { Typography } from "@material-ui/core";
import Emoji from "../Components/Emoji";
import BigButton from "../Components/BigButton";

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
      <BigButton label="Login" href="http://localhost:8888/login" />
    </div>
  );
}
