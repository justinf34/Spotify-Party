import io from "socket.io-client";

const SOCKET_IO_URL = "http://localhost:8889"; // Try to hide this late

export default function () {
  const socket = io(SOCKET_IO_URL);

  socket.on("connect", (data) => {
    console.log("You have connected to the main server!");
    console.log(data);
  });

  socket.on("error", (err) => {
    alert("received socket error: ", err);
  });

  function createRoom({ clientID, clientName }) {
    socket.emit("createRoom", { clientID, clientName });
  }

  function joinRoom(roomID, { clientID, clientName }) {
    socket.emit("joinRoom", { clientID, clientName });
  }

  function createRoomHandler(onRoomCreated) {
    socket.on("roomCreated", onRoomCreated);
  }
}
