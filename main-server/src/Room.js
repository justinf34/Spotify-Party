"use strict";

/**
 * Room object
 */
module.exports = class Room {
  constructor(id, { host_id, host_name }) {
    this.id = id;
    this.host_id = host_id;
    this.host_name = host_name;
    this.guests = [{ host_id, host_name }];
  }
};
