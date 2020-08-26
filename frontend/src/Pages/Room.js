import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Auth/Context";
import Chat from "../Components/Chat";
import Button1 from "../Components/Button1";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function Room(props) {
  const { roomID } = useParams();
  const { user, logout } = useAuth();

  const toRoomSelect = () => {
    props.history.replace("/");
  };

  // componentWillUnmount()?????

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
        <Chat client={this.props.client} roomID={roomID} user={user} />
      </div>
    </div>
  );
}

export default Room;
