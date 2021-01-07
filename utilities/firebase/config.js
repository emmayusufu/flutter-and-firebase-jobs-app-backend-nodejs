const firebase = require("firebase");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9zrmxCmR0YCfsS-rn8G7xuDoF-QZJyVQ",
  authDomain: "workmannow-18c9c.firebaseapp.com",
  projectId: "workmannow-18c9c",
  storageBucket: "workmannow-18c9c.appspot.com",
  messagingSenderId: "752560876389",
  appId: "1:752560876389:web:ae7bfb5078ead78b154f8c",
  measurementId: "G-B1YZTE9Q16",
};

const app = firebase.initializeApp(firebaseConfig);

module.exports = app;
