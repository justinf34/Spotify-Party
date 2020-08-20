// import Room from "./Room.js";
const Room = require("./Room.js");

// Firebase import
const firebase = require("../firebase.js");
const db = firebase.db;

/**
 * Handles the creation and deletion of rooms
 */
module.exports = function () {
  let rooms = new Map();

  // Handler for creating a room
  async function createNewRoom(client_id, client_name) {
    const base_query = db.collection("Rooms");
    try {
      const addRoomRes = await base_query.add({});
      const roomID = addRoomRes.id;

      await base_query.doc(roomID).collection("Messages").add({});
      const newRoom = new Room(roomID, { client_id, client_name });
      rooms.set(roomID, newRoom);

      return roomID;
    } catch (err) {
      // Delete the newly created room if it was created
      rooms.doc(roomID).delete();
      return null;
    }
  }

  return {
    createNewRoom,
  };
};
