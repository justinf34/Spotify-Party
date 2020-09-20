import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Auth/Context";
import { saveEntry } from "../Utils/Queries";

import Chat from "../Components/Chat";
import Button1 from "../Components/Button1";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function Room(props) {
  const { roomID } = useParams();
  const { user, logout } = useAuth();

  useEffect(() => {
    const msg = {
      author: user,
      type: "announcement",
      message: "joined the room",
    };

    async function announceJoin() {
      const res = await saveEntry(roomID, msg);
      props.onSendMessage(roomID, msg, () =>
        console.log("Join announcement sent")
      );
    }

    announceJoin();

    return function cleanup() {
      props.leaveRoom(roomID);
    };
  }, []);

  const toRoomSelect = () => {
    props.history.replace("/");
  };

  return (
    <div className="RoomLayout">
      <div className="RoomLayoutHeader">
        <Button1
          startIcon={<ArrowBackIosIcon />}
          onClick={toRoomSelect}
          label="Room Select"
        />
        <Button1 label="Logout" onClick={logout} />
      </div>
      <div className="RoomLayoutBody">
        <Chat {...props} roomID={roomID} user={user} />
      </div>
    </div>
  );
}

export default Room;
