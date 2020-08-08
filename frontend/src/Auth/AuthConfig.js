require("dotenv").config();

export const authConfig = {
  client_id: process.env.SPOTIFY_CLIENT_ID,
  redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  auth_endpoint: "https://accounts.spotify.com/authorize?",
  token_endpoing: "https://accounts.spotify.com/api/token",
  scope: "user-read-private user-read-email streaming",
};
