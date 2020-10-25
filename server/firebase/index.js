const admin = require("firebase-admin");

const serviceAccount = require("../config/firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shop-24ca3.firebaseio.com",
});

module.exports = admin;
