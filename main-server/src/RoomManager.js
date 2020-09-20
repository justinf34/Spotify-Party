const Room = require("./Room.js");

// Firebase import
const firebase = require("../firebase.js");
const db = firebase.db;

/**
 * Handles the creation and deletion of rooms
 */
module.exports = function () {
  const Rooms = new Map();
  const base_query = db.collection("Rooms");

  /**
   * Handler for creating a room
   * @param {string} client_id
   * @param {string} client_name
   */
  async function createNewRoom(client_id, client_name) {
    try {
      console.log("Trying to create new room...");

      let res = await base_query.add({});
      const roomID = res.id;

      // res = await base_query.doc(roomID).collection("Messages"ß).add({
      //   author: client_name,
      //   type: "announcement",
      //   message: "joined the room",
      // });

      const newRoom = new Room(roomID, client_id, client_name);
      Rooms.set(roomID, newRoom);

      console.log(`Room ${roomID} created`);
      console.log(Rooms);

      return roomID;
    } catch (err) {
      // Delete the newly created room if it was created
      console.log("Error in creating room...");
      const res = base_query.doc(roomID).delete();
      return null;
    }
  }

  function joinRoom(roomID, client_id, client_name) {
    const room = Rooms.get(roomID);
    room.addGuest(client_id, client_name);
  }

  function leaveRoom(roomID, client_id) {
    const room = Rooms.get(roomID);
    const res = room.removeGuest(client_id);
    if (res) {
      deleteRoom(roomID);
    }
  }

  async function deleteRoom(roomID) {
    console.log(`Deleting room ${roomID}...`);

    const res = await base_query
      .doc(roomID)
      .delete()
      .then((res) => console.log(`Deleted room ${roomID}`))
      .catch((err) => {
        console.log(`Cannot not delete room ${roomID} \n Error: ${err}`);
      }); // Delete room from the database
    Rooms.delete(roomID); // Delete room from Map
  }

  return {
    createNewRoom,
    joinRoom,
    leaveRoom,
  };
};
