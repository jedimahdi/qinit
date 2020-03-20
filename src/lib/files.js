const fs = require('fs')
const path = require('path')

const getCurrentDirectoryBase = () => path.basename(process.cwd())

const directoryExists = filePath => fs.existsSync(filePath)

const createDirectory = path =>
  new Promise((resolve, reject) => {
    fs.mkdir(path, {recursive: true}, err => {
      if (err) reject(err)
      resolve()
    })
  })

const getSrcDir = name => `./${name}/src/`

const getRootDir = name => `./${name}/`

module.exports = {
  getCurrentDirectoryBase,
  directoryExists,
  createDirectory,
  getSrcDir,
  getRootDir,
}
