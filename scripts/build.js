const readdirp = require('readdirp')
const paths = require('../src/paths')
const markdownEngine = require('../src/markdownEngine')
const {writeFile} = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const rimraf = require('rimraf')
const { exec } = require("child_process")

const shell = (cmd) => {
  exec(cmd, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`)
          return
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`)
          return
      }
      if (stdout) {
        console.log(`stdout: ${stdout}`)
      }
  })
}

const build = async () => {
  rimraf.sync(`${paths.buildOutput}/*`)
  shell('cp -R ./public/* ./docs')
  const files = []
  for await (const entry of readdirp(paths.views, {fileFilter: '*.md'})) {
    const path = entry.path
    files.push(path)
  }
  
  
  files.forEach(async f => {
    const html = await markdownEngine(`./md/${f}`, undefined, async (a, f) => f)
    const file = path.basename(f)
    const endFileDir = `${paths.buildOutput}/${f.replace(file, '')}`
    mkdirp.sync(endFileDir)
    writeFile(`${paths.buildOutput}/${f.replace('md', 'html')}`, `${await html}`, (err) => {
      if (err) {
        return console.log(err)
      }
    })
  })
  
}

build()
