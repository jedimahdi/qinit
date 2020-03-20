#!/usr/bin/env node

const chalk = require('chalk')

const clear = require('clear')
const figlet = require('figlet')
const {askProjectInfo} = require('./lib/inquirer')
const {createReactApp, createHtmlApp} = require('./lib/apps')
const {directoryExists} = require('./lib/files')

clear()
console.log(chalk.yellow(figlet.textSync('Qinit', {horizontalLayout: 'full'})))

const run = async () => {
  try {
    const credentials = await askProjectInfo()

    if (directoryExists(credentials.name)) {
      console.log(chalk.red('Project with that name already exists!'))
      process.exit()
    }

    switch (credentials.type) {
      case 'react':
        await createReactApp(credentials.name)
        break

      case 'html':
        await createHtmlApp(credentials.name)
        break

      default:
        break
    }

    console.log(chalk.green('All done!'))
  } catch (err) {
    console.log(err)
  }
}

run()
