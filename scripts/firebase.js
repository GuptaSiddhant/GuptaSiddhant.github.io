const {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
} = require("firebase/firestore")

const collections = ["projects", "blog", "testimonies"]

const app = require("firebase/app").initializeApp({
  apiKey: "AIzaSyDtuA2g8c2Wy3HW-XxSjeMtaeV4EfmpNUk",
  authDomain: "guptasiddhant-com.firebaseapp.com",
  databaseURL: "https://guptasiddhant-com.firebaseio.com",
  projectId: "guptasiddhant-com",
  storageBucket: "guptasiddhant-com.appspot.com",
  messagingSenderId: "693972243954",
  appId: "1:693972243954:web:9cabb4774c7f9e6196876b",
  measurementId: "G-SVFRY7WXKB",
})

const backupDir = require("path").join(".", "backup")

const firestore = getFirestore(app)

module.exports = {
  app,
  collections,
  backupDir,
  firestore,
  setCollectionItem,
  setCollection,
}

async function setCollectionItem(collectionName, itemId, data) {
  if (itemId) {
    const docRef = doc(firestore, collectionName, itemId)
    await setDoc(docRef, data, { merge: true })
    return itemId
  }
  const collectionRef = collection(firestore, collectionName)
  const docRef = await addDoc(collectionRef, data)
  return docRef.id
}

async function setCollection(collectionName, items = []) {
  const promises = items.map((item) =>
    setCollectionItem(collectionName, item.id, item),
  )

  return Promise.all(promises)
}
