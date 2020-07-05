const reqModule = require("request");
const fs = require("fs");
const express = require("express");
const app = express();
const firebase = require("firebase");

let rawData = fs.readFileSync("token.json");
let token = JSON.parse(rawData);

let brawlToken = token.brawlToken;

//firebase initialization

let firebaseInitRaw = fs.readFileSync("firebaseInit.json");
let firebaseInit = JSON.parse(firebaseInitRaw);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseInit);
}

let loginTokenRaw = fs.readFileSync("loginToken.json");
let loginToken = JSON.parse(loginTokenRaw);

firebase
  .auth()
  .signInWithEmailAndPassword(loginToken.email, loginToken.password)
  .catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error", errorCode);
    console.log("errorMessage", errorMessage);
  });

const firestore = firebase.firestore();

firestore
  .collection("battleLog")
  .where("mode", "==", "unknown")
  .get()
  .then((snapshot) => {
    if (snapshot.empty) {
      console.log("no document");
      return;
    }
    snapshot.forEach((doc) => {
      var data = doc.data();
      data["mode"] = "hotZone";
      console.log(data);

      firestore
        .collection("battleLog")
        .doc(doc.id)
        .set({
          data
        })
        .then((msg) => {
          console.log("success");
        })
        .catch((e) => {
          console.log("err", e);
        });
    });
  });
