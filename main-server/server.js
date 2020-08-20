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
  console.log("A user connected with id", socket.id);

  socket.on("test", (msg) => {
    console.log("client: " + msg);
    socket.emit("canJoin", "Hello");
  });

  /**
   * Handler when a client request to create a new room
   *
   */
  socket.on("createRoom", (client_name) => {
    roomManager.createNewRoom(socket.id, client_name).then((res) => {
      if (res) {
        socket.emit("join", { room_id: res, host: true });
        socket.join(res);
      } else {
        socket.emit("join", null);
      }
    });
  });

  /**
   * Handler when a client disconnects from the server
   */
  socket.on("disconnect", function () {
    console.log("Client disconnect... " + socket.id);
    console.log(socket.rooms);
  });
});

// Port configuration
let port = process.env.PORT || 8889;
http.listen(port, (err) => {
  if (err) throw err;
  console.log(`Main server listening on port ${port}`);
});
