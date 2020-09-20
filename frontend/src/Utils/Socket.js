import io from "socket.io-client";

const SOCKET_IO_URL = "http://localhost:8889"; // Try to hide this late

export default function () {
  const socket = io(SOCKET_IO_URL);

  socket.on("connect", (data) => {
    console.log("You have connected to the main server!");
  });

  socket.on("error", (err) => {
    alert("received socket error: ", err);
  });

  function createRoom(clientName) {
    socket.emit("createRoom", clientName);
  }

  function onJoin(roomID, userName) {
    socket.emit("join", { roomID, userName });
  }

  function registerJoinHandler(onJoinRoom) {
    socket.on("joinRes", onJoinRoom);
  }

  function unregisterJoinHandler() {
    console.log("Unregistered join handler");
    socket.off("join");
  }

  function registerMsgReceiver(onMessageReceive) {
    socket.on("message", onMessageReceive);
  }

  function unregsisterMsgReceiver() {
    socket.off("message");
  }

  function onSendMessage(roomID, msg, cb) {
    socket.emit("sendMsg", { roomID, msg }, cb);
  }

  function leaveRoom(roomID) {
    console.log("Leaving the room...");
    socket.emit("leave", roomID);
  }

  function testServer(msg) {
    socket.emit("test", msg);
  }

  function disconnect() {
    socket.close();
  }

  return {
    createRoom,
    onJoin,
    testServer,
    disconnect,
    registerJoinHandler,
    unregisterJoinHandler,
    registerMsgReceiver,
    unregsisterMsgReceiver,
    onSendMessage,
    leaveRoom,
  };
}
