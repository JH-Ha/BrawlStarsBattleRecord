const firebase = require('firebase');
const fs = require('fs');
//firebase initialization

let firebaseInitRaw = fs.readFileSync("firebaseInit.json");
let firebaseInit = JSON.parse(firebaseInitRaw);


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseInit);
}

let email = "cubeprince@gmail.com";
let password = "ryxhdwjd100!";

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error);
    console.log(errorCode);
    // ...
  });