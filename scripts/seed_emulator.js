const { join } = require("path")
const { existsSync, readdirSync, readFileSync } = require("fs")
const { connectFirestoreEmulator } = require("firebase/firestore")
const { firestore, setCollectionItem, backupDir } = require("./firebase")

connectFirestoreEmulator(firestore, "localhost", 8080)

seed()
  .catch(console.error)
  .finally(() => console.log("Backup done."))

async function seed() {
  const backupFiles = await getBackupFiles()
  for (const filename of backupFiles) {
    const contents = readFileSync(join(backupDir, filename), {
      encoding: "utf8",
    })
    const data = JSON.parse(contents)
    await setCollection(filename.split(".")[0], data)
  }
}

async function getBackupFiles() {
  if (!existsSync(backupDir))
    throw new Error("Backup directory does not exist.")

  const backupFiles = readdirSync(backupDir)
  return backupFiles.filter((filename) => filename.endsWith(".json"))
}

async function setCollection(path = "projects", data) {
  if (!Array.isArray(data)) throw new Error("Data must be an array.")

  return Promise.all(data.map((item) => setCollectionItem(path, item.id, item)))
}
