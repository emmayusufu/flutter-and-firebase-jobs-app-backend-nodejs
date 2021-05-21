const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://workmannow-18c9c.appspot.com",
    databaseURL: "https://workmannow-18c9c-default-rtdb.firebaseio.com",
});

const db = admin.firestore();
const msg = admin.messaging();

module.exports = {
    db,
    msg,
};
