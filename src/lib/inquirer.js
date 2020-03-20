const inquirer = require('inquirer')

const askProjectInfo = () => {
  const questions = [
    {
      name: 'name',
      type: 'input',
      message: 'Enter your project name:',
      validate: function(value) {
        if (value.length) {
          return true
        } else {
          return 'Please enter your username or e-mail address.'
        }
      },
    },
    {
      type: 'list',
      name: 'type',
      message: 'Pick your project tech',
      choices: ['React', 'HTML'],
      filter: function(val) {
        return val.toLowerCase()
      },
    },
  ]
  return inquirer.prompt(questions)
}

module.exports = {askProjectInfo}
