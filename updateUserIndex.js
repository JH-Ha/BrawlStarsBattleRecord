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

const firestore = firebase.firestore();

firestore.collection("ID_LIST").orderBy("tag").get().then(function (snapshot) {
    //let numUser = snapshot.length;
    let index = 0;
    snapshot.forEach(function(doc){
        
        firestore.collection("ID_LIST").doc(doc.id).update({
            order : index
        });
        index ++;
    });

    firestore.collection("PageInfo").doc("ID_LIST").update({
        numUser : index
    });
});
