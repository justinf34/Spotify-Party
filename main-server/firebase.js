// Imports
const firebase = require("firebase/app");
const firestore = require("firebase/firestore");

require("dotenv").config();

// Firebase config
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

module.exports = {
  app: firebase.initializeApp(firebaseConfig),
  db: firebase.firestore(),
};
