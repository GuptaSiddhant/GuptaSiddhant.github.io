const { join } = require("path")
const { readFileSync } = require("fs")
const { setCollection } = require("./firebase")

upload()
  .catch(console.error)
  .finally(() => console.log("Backup done."))

async function upload(collectionName = "career") {
  const file = readFileSync(join("public", collectionName, "index.json"), {
    encoding: "utf8",
  })
  const list = JSON.parse(file)

  return setCollection(collectionName, list)
}
