// Express set up
const express = require("express");
const app = express();

// SocketIO setup
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Setting up manager
const RoomManager = require("./src/RoomManager.js");
const { getMaxListeners } = require("process");
const roomManager = RoomManager();

app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  console.log(`A user connected with id ${socket.id}`);

  socket.on("test", (msg) => {
    console.log("client: " + msg);
    socket.emit("canJoin", "Hello");
  });

  /**
   * Handler when a client request to create a new room
   */
  socket.on("createRoom", (client_name) => {
    console.log(`Client ${socket.id} requested to make a new room`);

    roomManager.createNewRoom(socket.id, client_name).then((res) => {
      if (res) {
        socket.emit("joinRes", { room_id: res, host: true });
        socket.join(res);
      } else {
        socket.emit("joinRes", null);
      }
    });
  });

  socket.on("leave", (roomID) => {
    console.log(`Client ${socket.id} is leaving room ${roomID}`);
    roomManager.leaveRoom(roomID, socket.id);
  });

  /**
   *
   */
  socket.on("join", (req) => {
    console.log(`Client ${socket.id} requested to join room ${req.roomID}`);
    roomManager.joinRoom(req.roomID, socket.id, req.userName);

    socket.emit("joinRes", { room_id: req.roomID, host: false });
  });

  socket.on("sendMsg", (req) => {
    console.log(
      `Client ${socket.id} is sending a message to room ${req.roomID}`
    );
    socket.to(req.roomID).emit("message", req.msg);
  });

  /**
   * Handler when a client disconnects from the server
   */
  socket.on("disconnecting", () => {
    const rooms = Object.keys(socket.rooms);
    console.log(`Client ${socket.id} were in room ${rooms} ${rooms.length}`);

    if (rooms.length == 2) {
      roomManager.leaveRoom(rooms[1], socket.id);
      console.log(`Left ${rooms[1]}`);
    }
    // TO DO
    //  - Write up clean up code
  });

  socket.on("disconnect", function () {
    console.log(`Client ${socket.id} disconnected.`);
    const rooms = Object.keys(socket.rooms);
    console.log(`Client ${socket.id} were in room ${rooms} ${rooms.length}`);
  });
});

// Port configuration
let port = process.env.PORT || 8889;
http.listen(port, (err) => {
  if (err) throw err;
  console.log(`Main server listening on port ${port}`);
});
