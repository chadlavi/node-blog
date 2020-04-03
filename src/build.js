const readdirp = require('readdirp')
const markdown = require('./renderMarkdown')
const parseMarkdown = require('./parseMarkdown')
const paths = require('./paths')
const markdownEngine = require('./markdownEngine')
const {writeFile} = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const rimraf = require('rimraf')

const generator = async () => {
  rimraf.sync('./dist/*')
  
  const files = []
  for await (const entry of readdirp(paths.views, {fileFilter: '*.md'})) {
    const path = entry.path
    files.push(path)
  }
  
  
  await files.forEach(async f => {
    const html = await markdownEngine(`/app/md/${f}`, undefined, async (a, f) => f)
    // console.log(html)
    const file = path.basename(f)
    const endFileDir = `./dist/${f.replace(file, '')}`
    mkdirp.sync(endFileDir)
    await writeFile(`./dist/${f.replace('md', 'html')}`, `${await html}`, (err) => {
      if (err) {
        return console.log(err)
      }
    })
  })
  
}

module.exports = generator
