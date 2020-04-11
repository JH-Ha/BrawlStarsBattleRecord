const firebase = require('firebase');
const fs = require('fs');
//firebase initialization

let firebaseInitRaw = fs.readFileSync("firebaseInit.json");
let firebaseInit = JSON.parse(firebaseInitRaw);

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


let modeList = [
  GEM_GRAB,
  BRAWL_BALL,
  SOLO_SHOWDOWN,
  DUO_SHOWDOWN,
  HEIST,
  SIEGE,
  BIG_GAME,
  BOUNTY
];

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseInit);
}

const firestore = firebase.firestore();

let idList = firestore.collection("ID_LIST");

let initValue = {
  numRanked : 0,
  changedTropies : 0,
};

let brawlerNameList = [
  "SHELLY",
  "NITA",
  "COLT",
  "BULL",
  "JESSIE",
  "BROCK",
  "DYNAMIKE",
  "EL PRIMO",
  "BARLEY",
  "POCO",
  "RICO",
  "DARRYL",
  "PIPER",
  "PENNY",
  "BO",
  "MORTIS",
  "TARA",
  "PAM",
  "FRANK",
  "CROW",
  "SPIKE",
  "LEON",
  "GENE",
  "TICK",
  "ROSA",
  "8-BIT",
  "CARL",
  "BIBI",
  "EMZ",
  "BEA",
  "SPROUT",
  "SANDY",
  "JACKY",
  "MAX",
  "MR. P"
];

/* brawlerNameList.forEach( brawlerName =>{ */
  // initValue["changedTropies"+brawlerName] = 0;
  // initValue["numRanked" + brawlerName] = 0;
/* }); */

console.log(initValue);

idList.get().then( snapshot =>{
  if(snapshot.empty){
    console.log("No matching documents.");
    return;
  }
  snapshot.forEach((doc) =>{
    modeList.forEach( (mode) =>{
/*       brawlerNameList.forEach( (brawlerName) =>{ */
        // initValue["brawlerName"] = brawlerName;
        // initValue["time"] = "2020-04";
        // idList.doc(doc.id).collection(mode).doc("2020-04 " + brawlerName).set(initValue);
      /* }); */
      idList.doc(doc.id).collection(mode).doc("2020-04").set(
        {totalNumRanked : 0,
          totalChangedTropies : 0,
        });
    })
  })
}).catch(function(error){
  console.log("Error getting document:", error);
});
