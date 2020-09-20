/**
 * Function prototype for the Room object
 * @param {*} roomID
 * @param {*} param1
 */
function Room(roomID, hostID, hostName) {
  this.id = roomID;
  this.host = {
    id: hostID,
    name: hostName,
  };
  this.guests = new Map();
  this.guests.set(hostID, hostName);
}

/**
 *
 * @param {*} guestID
 * @param {*} guestName
 */
Room.prototype.addGuest = function (guestID, guestName) {
  this.guests.set(guestID, guestName);
};

/**
 *
 * @param {*} guestID
 */
Room.prototype.removeGuest = function (guestID) {
  this.guests.delete(guestID);

  if (this.guests.size === 0) {
    return true;
  } else {
    // Check if needs host change
    if (this.host.id === guestID) {
      const hostKey = this.guests.keys().next().value;
      this.host = this.guests.get(hostKey);
    }
    return false;
  }
};

module.exports = Room;
