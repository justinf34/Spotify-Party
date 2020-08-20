const express = require("express");
const app = express();

// SocketIO setup
const http = require("http").Server(app);
const io = require("socket.io")(http);

const Manager = require("./src/RoomManager.js");
const RoomManager = new Manager();

app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  console.log("A user connected with id", socket.id);

  /**
   * Handling the creation of new rooms
   */
  socket.on("createNewRoom", async (clientName) => {
    console.log("user", clientID, "wants to create a new Room");

    RoomManager.createNewRoom(socket.id, clientName).then((res) => {
      if (res) {
        socket.join(res);
      }
      io.to(socket.id).emit("roomCreated", res);
    });
  });

  /**
   * Handler when a user disconnects from the server
   */
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

http.listen(8889, function () {
  console.log("listening on port 8889");
});
