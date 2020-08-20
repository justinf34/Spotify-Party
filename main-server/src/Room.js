module.exports = function Room(roomID, { hostID, hostName }) {
  this.id = roomID;
  this.host = {
    id: hostID,
    name: hostName,
  };
  this.guests = [];
};
