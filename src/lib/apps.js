const fs = require('fs')
const CLI = require('clui')
const {
  getIndexHtmlContent,
  getStyleContent,
  getValidFilesContent,
  getTesterConfigContent,
  getStatementContent,
  getQTestContent,
  getQSampleTestContent,
  getGitIgnoreContent,
  getReactIndexHtmlContent,
  getAppTestContent,
  getIndexjsContent,
  getAppjsContent,
  getRequirementsContent,
  getPythonTestContent,
} = require('./contents')
const {
  directoryExists,
  createDirectory,
  getSrcDir,
  getRootDir,
} = require('./files')
const {execute} = require('./helpers')
const Spinner = CLI.Spinner

const createReactApp = async name => {
  await createDirectory(name)
  await createDirectory(getRootDir(name) + 'statement/')

  const status = new Spinner('Creating React App, please wait...')
  status.start()
  const stdout = await execute(`cd ${name}; npx create-react-app src --use-npm`)
  status.stop()

  const src_dir = getSrcDir(name)

  fs.unlinkSync(src_dir + '.gitignore')
  fs.unlinkSync(src_dir + 'README.md')
  fs.unlinkSync(src_dir + 'src/serviceWorker.js')
  fs.unlinkSync(src_dir + 'src/setupTests.js')
  fs.unlinkSync(src_dir + 'src/logo.svg')
  fs.unlinkSync(src_dir + 'src/App.test.js')
  fs.unlinkSync(src_dir + 'src/App.css')
  fs.unlinkSync(src_dir + 'public/logo192.png')
  fs.unlinkSync(src_dir + 'public/logo512.png')
  fs.unlinkSync(src_dir + 'public/manifest.json')
  fs.unlinkSync(src_dir + 'public/robots.txt')

  fs.writeFileSync(
    getRootDir(name) + 'statement/statement.md',
    getStatementContent(name),
  )
  fs.writeFileSync(
    getRootDir(name) + 'tester_config.json',
    getTesterConfigContent(name),
  )
  fs.writeFileSync(getRootDir(name) + 'valid_files', getValidFilesContent())
  fs.writeFileSync(getRootDir(name) + '.gitignore', getGitIgnoreContent())

  fs.writeFileSync(src_dir + 'src/index.js', getIndexjsContent())
  fs.writeFileSync(src_dir + 'src/App.js', getAppjsContent())
  fs.writeFileSync(src_dir + '.qtest', getQTestContent())
  fs.writeFileSync(src_dir + '.qsampletest', getQSampleTestContent())
  fs.writeFileSync(
    src_dir + 'public/index.html',
    getReactIndexHtmlContent(name),
  )

  await createDirectory(src_dir + 'src/__tests__/')
  fs.writeFileSync(src_dir + 'src/__tests__/app.test.js', getAppTestContent())
  fs.writeFileSync(
    src_dir + 'src/__tests__/sample.test.js',
    getAppTestContent(),
  )

  if (directoryExists(src_dir + '.git')) {
    await execute(`cd ${name}/src; rm -rf .git`)
  }
}

const createHtmlApp = async name => {
  const src_dir = getSrcDir(name)

  await createDirectory(name)
  await createDirectory(getRootDir(name) + 'src/')
  await createDirectory(getRootDir(name) + 'statement/')
  await createDirectory(src_dir + '__tests__/')

  fs.writeFileSync(getRootDir(name) + 'valid_files', getValidFilesContent())
  fs.writeFileSync(getRootDir(name) + '.gitignore', getGitIgnoreContent())
  fs.writeFileSync(
    getRootDir(name) + 'statement/statement.md',
    getStatementContent(name),
  )
  fs.writeFileSync(
    getRootDir(name) + 'tester_config.json',
    getTesterConfigContent(name),
  )
  fs.writeFileSync(src_dir + '.qtest', getQTestContent())
  fs.writeFileSync(src_dir + '.qsampletest', getQSampleTestContent())
  fs.writeFileSync(src_dir + 'index.html', getIndexHtmlContent(name))
  fs.writeFileSync(src_dir + 'style.css', getStyleContent())
  fs.writeFileSync(src_dir + '__tests__/test.py', getPythonTestContent())
  fs.writeFileSync(
    src_dir + '__tests__/requirements.txt',
    getRequirementsContent(),
  )
}

module.exports = {createReactApp, createHtmlApp}
