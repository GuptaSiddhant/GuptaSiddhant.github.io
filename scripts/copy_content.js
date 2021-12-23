#! /usr/bin/env node

const fs = require("fs")
const path = require("path")
const cwd = process.cwd()

const SRC = "content"
const DEST = "public"

const dirNames = fs
  .readdirSync(path.join(cwd, SRC), {
    withFileTypes: true,
  })
  .filter((file) => file.isDirectory())
  .map((file) => file.name)

dirNames.forEach((dir) => {
  const src = path.join(cwd, SRC, dir)
  const dest = path.join(cwd, DEST, dir)
  copyRecursiveSync(src, dest)
})

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
function copyRecursiveSync(src, dest) {
  var exists = fs.existsSync(src)
  var stats = exists && fs.statSync(src)
  var isDirectory = exists && stats.isDirectory()
  if (isDirectory) {
    !fs.existsSync(dest) && fs.mkdirSync(dest)
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
      )
    })
  } else {
    fs.copyFileSync(src, dest)
  }
}
