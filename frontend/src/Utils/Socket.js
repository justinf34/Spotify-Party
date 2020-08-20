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

  function createRoom(clientName) {
    socket.emit("createRoom", clientName);
  }

  function joinRoomHandler(onJoinRoom) {
    socket.on("join", onJoinRoom);
  }

  function testServer(msg) {
    socket.emit("test", msg);
  }

  function disconnect() {
    socket.close();
  }

  return {
    createRoom,
    testServer,
    disconnect,
    joinRoomHandler,
  };
}
