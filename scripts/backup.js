const { join } = require("path")
const { writeFileSync, mkdirSync, existsSync } = require("fs")
const {
  getFirestore,
  query,
  collection,
  getDocs,
} = require("firebase/firestore")
const { app, collections, backupDir } = require("./firebase")

backup()
  .catch(console.error)
  .finally(() => console.log("Backup done."))

async function backup() {
  if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true })

  for (const collection of collections) {
    const docs = await getCollection(collection)
    const json = JSON.stringify(docs)
    const filename = join(backupDir, `${collection}.json`)
    writeFileSync(filename, json, { encoding: "utf8" })
  }
}

async function getCollection(path = "projects") {
  const firestore = getFirestore(app)
  const queryRef = query(collection(firestore, path))
  const querySnapshot = await getDocs(queryRef)

  return Promise.all(
    querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        ...data,
        id: doc.id,
        date: data.date?.toDate(),
        dateStart: data.dateStart?.toDate(),
        dateEnd: data.dateEnd?.toDate(),
      }
    }),
  )
}
