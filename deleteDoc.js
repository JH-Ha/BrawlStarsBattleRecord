const firebase = require('firebase');
const fs = require('fs');
//firebase initialization

let firebaseInitRaw = fs.readFileSync("firebaseInit.json");
let firebaseInit = JSON.parse(firebaseInitRaw);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseInit);
}

const firestore = firebase.firestore();

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


let soleRef = firestore
  .collection("battleLog")
  .where("mode", "==", "soloShowdown");


soleRef
  .get()
  .then((snapshot) => {
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      firestore.collection("battleLog").doc(doc.id).delete();
      console.log("deleted");
    });
  })
  .catch((err) => {
    console.log("Error getting documents", err);
  });
