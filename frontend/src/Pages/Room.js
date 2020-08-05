import React from "react";
import { Typography } from "@material-ui/core";
import Emoji from "../Components/Emoji";

export default function Room() {
  return (
    <div className="roomPage">
      <Typography varinat="subtitle1">
        You are now in a room <Emoji symbol="👅" />
      </Typography>
    </div>
  );
}
