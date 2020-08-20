import React from "react";
import { useParams } from "react-router-dom";

import Chat from "../Components/Chat";
import { Paper, Typography } from "@material-ui/core";

export default function Room(props) {
  const { roomID } = useParams();
  console.log(props.history.location);
  return (
    <React.Fragment>
      <Chat />
    </React.Fragment>
  );
}

/**
 * TO DO:
 *  - Create header wiht logout and back to room select
 *  - Show message of person leaving the room
 *  - Get all messages from DB
 *  - Figure out how to show when users joins the room
 *  - Test Chat
 */
