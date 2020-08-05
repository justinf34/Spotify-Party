// import Room from "./Room.js";
const Room = require("./Room.js");

// Firebase import
const firebase = require("../firebase.js");
const db = firebase.db;

/**
 * Handles the creation and deletion of rooms
 */
module.exports = class RoomManager {
  constructor() {
    this.rooms = [];
  }

  async createNewRoom(client_id, client_name) {
    const roomID = null;

    const rooms = db.collection("Rooms");
    try {
      const addRoomRes = await rooms.add({});
      roomID = addRoomRes.id;

      const addMsgColRes = await rooms
        .doc(roomID)
        .collection("Messages")
        .add({});

      const newRoom = new Room(roomID, { client_id, client_name });
      this.rooms.push(newRoom);

      return roomID;
    } catch (err) {
      // Delete the newly created room if it was created
      rooms.doc(roomID).delete();

      // Notify user that something went wrong
      return null;
    }
  }

  deleteRoom() {
    /**
     * When someone leaves the room, check how many in the room is left
     *    if 0 => delete room
     */
  }

  joinsRoom(roomId) {
    /**
     * Add particpant to the proper room
     */
  }

  leavesRoom() {
    /**
     * when someone leaves room, check the number of
     * of guests
     *    if 0 => delete room
     *    else => update room
     */
  }

  addRoomMessages() {
    /**
     * When someone sends a new message, add to db
     */
  }

  changeHost(hostId) {
    /**
     *
     */
  }
};
