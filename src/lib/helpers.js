const {exec} = require('child_process')

const execute = command =>
  new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err)
      }
      resolve(stdout)
    })
  })

module.exports = {execute}
