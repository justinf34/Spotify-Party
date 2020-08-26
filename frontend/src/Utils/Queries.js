import { db } from "../firebase";

/**
 * Retrieves the chat history of a room
 * @param {string} roomID
 */
export async function getChatHistory(roomID) {
  const base_query = db.collection("Rooms").doc(roomID).collection("Messages");

  try {
    const messages = await base_query.get();
    return messages;
  } catch (error) {
    console.log(error);
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
