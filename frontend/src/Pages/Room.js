import React from "react";
import { useParams } from "react-router-dom";

import Chat from "../Components/Chat";
import { Paper, Typography } from "@material-ui/core";

export default function Room() {
  const { roomID } = useParams();
  return (
    <React.Fragment>
      <Chat />
    </React.Fragment>
  );
}
