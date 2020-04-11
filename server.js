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

app.get("/", (req, res) => {
  let tag = req.query.tag;
  let tagEscape = escape(tag);
  if (tag === undefined) {
    res.send("please put your tag");
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
    var battleLogJson = JSON.parse(body);
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
    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
      let item = items[i];
      let mode = item.event.mode;

      if (isTrio(mode)) {
        handleTrio(item, tag);
      } else if (isDuo(mode)) {
        handleDuo(item, tag);
      } else if (isSolo(mode)) {
        handleSolo(item, tag);
      } else {
        console.log(`${mode} is not handled.`);
      }
    }
    res.send("battle logs are successfully updated");
  });
  //  res.send("express server");
});

app.get("/test", (req, res) => {
  res.send("test success");
});

function makeDateTimeFormat(time) {
  var year = time.substring(0, 4);
  var month = time.substring(4, 6);
  var date = time.substring(6, 8);
  var hour = time.substring(9, 11);
  var minute = time.substring(11, 13);
  var second = time.substring(13, 15);
  var dateTimeFormatStr =
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  //console.log(dateTimeFormatStr);
  return dateTimeFormatStr;
}

function handleSolo(item, tag) {
  console.log("handleSolo");
  let battleTime = item.battleTime;
  let battle = item.battle;
  let mode = battle.mode;
  let type = battle.type;
  let rank = battle.rank;
  let trophyChange = battle.trophyChange || 0;
  let players = battle.players;

  let brawler_name = null;
  let power = null;
  let trophies = null;
  for (let i = 0; i < players.length; i++) {
    let player = players[i];
    if (player.tag === tag) {
      power = player.brawler.power;
      trophies = player.brawler.trophies;
    }
  }

  let isPowerPlay = false;

  if (soloPointArr[rank - 1] === trophyChange) {
    isPowerPlay = true;
  }

  let userCollection = firestore.collection("battleLog");

  let gameInfo = {
    battleTime: battleTimeFormat(battleTime),
    mode: mode,
    map: item.event.map,
    type: type,
    rank: rank,
    trophyChange: trophyChange,
    brawler_name: brawler_name,
  };
  if (type === RANKED) {
    gameInfo.power = power;
    gameInfo.trophies = trophies;
  }
}
function handleDuo(item, tag) {
  console.log("handle Duo");
  let battle = item.battle;
  let mode = battle.mode;
  let rank = battle.rank;
  let trophyChange = battle.trophyChange || 0;

  let type = battle.type;
  let teams = battle.teams;

  let brawler_name = null;
  let power = null;
  let trophies = null;

  let battleTime = item.battleTime;
  let battleTimeFormat = makeDateTimeFormat(battleTime);

  let userCollection = firestore.collection("battleLog");
  let isPowerPlay = false;

  if (trophyChange === duoPointArr[rank - 1]) {
    isPowerPlay = true;
  }

  for (let i_t = 0; i_t < teams.length; i_t++) {
    let team = teams[i_t];
    for (let i_m = 0; i_m < team.length; i_m++) {
      let member = team[i_m];
      if (member.tag === tag) {
        brawler_name = member.brawler.name;
        power = member.brawler.power;
        trophies = member.brawler.trophies;
      }
    }
  }

  let gameInfo = {
    tag: tag,
    battleTime: battleTimeFormat,
    map: item.event.map,
    mode: mode,
    rank: rank,
    trophyChange: trophyChange,
    isPowerPlay: isPowerPlay,
    brawler_name: brawler_name,
    //power: power,
    //    trophies: trophies,
  };
  if (type === RANKED) {
    gameInfo.power = power;
    gameInfo.trophies = trophies;
  }
  userCollection.doc(tag + "_" + battleTime).set(gameInfo);
}
function handleTrio(item, tag) {
  let battle = item.battle;
  let result = battle.result;
  let duration = battle.duration;
  let trophyChange = battle.trophyChange || 0;

  let type = battle.type;
  let teams = battle.teams;
  let isPowerPlay = false;

  let brawler_name = null;
  let power = null;
  let trophies = null;

  let mode = item.event.mode;
  let map = item.event.map;

  let battleTime = item.battleTime;

  let userCollection = firestore.collection("battleLog");

  let battleTimeFormating = makeDateTimeFormat(battleTime);

  //let idList = firestore.collection('ID_LIST');

  for (let i_t = 0; i_t < teams.length; i_t++) {
    let team = teams[i_t];
    for (let i_m = 0; i_m < team.length; i_m++) {
      let member = team[i_m];
      if (member.tag === tag) {
        brawler_name = member.brawler.name;
        power = member.brawler.power;
        trophies = member.brawler.trophies;
      }

      /* idList */
      // .doc(member.tag)
      // .get()
      // .then((doc) => {
      //   if (!doc.exists) {
      //     idList.doc(member.tag).set({
      //       name: member.name,
      //     });
      //   }
      // })
      // .catch((err) => {
      //   console.log("Error getting document", err);
      /* }); */
    }
  }

  //power play인지 확인한다. 월등한 승리일 경우 +3점이 된다.
  if (
    trophyChange === trioPointArr[result] ||
    trophyChange === trioPointArr[result] + 3
  ) {
    isPowerPlay = true;
  }
  //check starPlayer
  let isStarPlayer = false;

  let starPlayer = battle.starPlayer;
  if (starPlayer.tag === tag) {
    isStarPlayer = true;
  }

  let isDebug = false;
  if (isDebug) {
    console.log(`battleTimeFormat : ${battleTimeFormating}`);
    console.log(`map : ${map}`);
    console.log(`mode : ${mode}`);
    console.log(`result : ${result}`);
    console.log(`duration : ${duration}`);
    console.log(`trophyChange : ${trophyChange}`);
    console.log(`isPowerPlay : ${isPowerPlay}`);
    console.log(`isStarPlayer : ${isStarPlayer}`);
    console.log(`brawler_name : ${brawler_name}`);
    console.log(`power : ${power}`);
    console.log(`trophies : ${trophies}`);
  }

  let gameInfo = {
    tag: tag,
    type: type,
    battleTime: battleTimeFormating,
    map: map,
    mode: mode,
    result: result,
    duration: duration,
    trophyChange: trophyChange,
    isPowerPlay: isPowerPlay,
    isStarPlayer: isStarPlayer,
    brawler_name: brawler_name,
  };
  if (type === RANKED) {
    gameInfo.power = power;
    gameInfo.trophies = trophies;
  }
  userCollection.doc(tag + "_" + battleTime).set(gameInfo);
}

let port = 443;

app.listen(port, () => {
  console.log(`http server port on ${port}`);
});

//Periodically request battle logs and update them to database

let options = {
  uri: `http://localhost:${port}/`,
  qs: {
    tag: "",
  },
};

let callUpdateAPI = function () {
  console.log(new Date());

  let idArr = [];
  let testRequest = (idx) => {
    console.log(`idx ${idx}`);
    if (idx >= idArr.length) return;

    options.qs.tag = idArr[idx];
    console.log(options);
    reqModule(options, function (err, response, body) {
      console.log(body);
      testRequest(idx + 1);
    });
  };

  let idList = firestore.collection("ID_LIST");
  idList
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach((doc) => {
        //console.log(doc.id);
        idArr.push(doc.id);
      });
      testRequest(0);
      //console.log(snapshot);
      console.log(idArr);
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
};

/* firestore.collection("battleLog").where("battleTime","==", "2020-04-08 18:37:19") */
// .get()
// .then(function(querySnapshot){
//   querySnapshot.forEach(function(doc){
//     console.log(doc.id, "=>", doc.data());
//   });
// })
// .catch(function(error){
//   console.log("error getting documents:", error);
/* }); */

//callUpdateAPI();
//setInterval( callUpdateAPI , 3600 * 1000);
//
//
//

//remove collection from firestore

function deleteCollection(db, collectionPath, batchSize) {
  let collectionRef = db.collection(collectionPath);
  let query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}
function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query
    .get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size == 0) {
        return 0;
      }

      // Delete documents in a batch
      let batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    })
    .catch(reject);
}


