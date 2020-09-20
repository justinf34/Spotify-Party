/**
 * Functions that queries the firebase DB
 */
import { db } from "../firebase";
import message from "../Components/messages";

/**
 * Retrieves the chat history of a room
 * @param {string} roomID
 */
export async function getChatHistory(roomID) {
  console.log(roomID);
  const base_query = db.collection("Rooms").doc(roomID).collection("Messages");

  try {
    const results = await base_query.get();
    let messages = [];
    results.forEach((entry) => {
      const entry_data = entry.data();
      messages.push(entry_data);
    });
    return messages;
  } catch (error) {
    console.warn(`Queries.js -> ${error}`);
    throw error;
  }
}

/**
 * Save the message to the DB
 * @param {string} roomID
 * @param {object} msg
 */
export async function saveEntry(roomID, msg) {
  const base_query = db.collection("Rooms").doc(roomID).collection("Messages");

  try {
    await base_query.add(msg);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
