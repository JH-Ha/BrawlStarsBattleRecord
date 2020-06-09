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

//mode
var GEM_GRAB = "gemGrab";
var BRAWL_BALL = "brawlBall";
var SOLO_SHOWDOWN = "soloShowdown";
var DUO_SHOWDOWN = "duoShowdown";
var TAKEDOWN = "takedown";
var HEIST = "heist";
var SIEGE = "siege";
var BIG_GAME = "bigGame";
var BOUNTY = "bounty";
var LONE_STAR = "loneStar";

//type
var RANKED = "ranked";
var FRIENDLY = "friendly";

//trophyChangeArray for checking it is power play or not
var soloPointArr = [38, 34, 30, 26, 22, 18, 14, 10, 6, 2];
var duoPointArr = [34, 26, 18, 10, 2];
var trioPointArr = {
    victory: 30,
    draw: 10,
    defeat: 5,
};



function isTrio(mode) {
    if (
      mode === GEM_GRAB ||
      mode === BRAWL_BALL ||
      mode === HEIST ||
      mode === BOUNTY ||
      mode === SIEGE
    ) {
      return true;
    }
    return false;
  }
  function isSolo(mode) {
    if (mode === SOLO_SHOWDOWN || mode === TAKEDOWN || mode === LONE_STAR) {
      return true;
    }
    return false;
  }
  function isDuo(mode) {
    if (mode === DUO_SHOWDOWN) {
      return true;
    }
    return false;
  }
  

let tag = "#8ULJ92Y0P";
let tagEscape = escape(tag);
if (tag === undefined) {
    res.send("error 404 ");
    return;
}

var url = "https://api.brawlstars.com/v1/players/" + tagEscape + "/battlelog";
const auth = `Bearer ${brawlToken}`;
console.log("auth ", auth);
const options = {
    uri: url,
    headers: {
        authorization: auth,
    },
};
reqModule(options, function (err, response, body) {
    //console.log(body);
    console.log(err, response, body);
    var battleLogJson = null;

    try {
        battleLogJson = JSON.parse(body);
    } catch (e) {
        console.log(e);
        res.send("parse error");
        return;
    }
    //res.send(body);
    //console.log(battleLogJson);
    //send(body);
    /*     reqModule.post(slackOptions, function (err, httpResponse, slackBody) { */
    // console.log(slackBody);
    /* }); */
    if (battleLogJson.items == undefined) {
        res.send(`${body}`);
        return;
    }
    let items = battleLogJson.items;
    //console.log(items);
    for(let i = 0; i<items.length ; i ++){
        let item = items[i];
        console.log(item);
        let mode = item.battle.mode;
        if(isSolo(mode)){
            let players = item.battle.players;
            players.forEach(function(player,index){
                console.log(player);
                let tag = player.tag;
                let name = player.name;
                firestore.collection("ID_LIST").doc(tag).set({
                    tag : tag,
                    name : name
                });
            });
        } else if(isTrio(mode)){
            console.log(item);
            let teams = item.battle.teams;
            teams.forEach(function(team, index){
                team.forEach(function(player,index){
                    let tag = player.tag;
                    let name = player.name;
                    console.log(player);
                    firestore.collection("ID_LIST").doc(tag).set({
                        tag : tag,
                        name : name
                    });
                });
            });
        }
    }
});