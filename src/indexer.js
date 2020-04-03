const readdirp = require('readdirp')
const markdown = require('./renderMarkdown')
const parseMarkdown = require('./parseMarkdown')
const paths = require('./paths')

const indexer = async () => {
  const files = []
  for await (const entry of readdirp(paths.views, {fileFilter: '*.md'})) {
    const path = entry.path
    files.push(path)
  }
  
  const result = await files
    .filter(f => f !== 'index.md')
    .sort()
    .reverse()
    .reduce(async (a, r) => {
      const parsed = await parseMarkdown(`./md/${r}`)
      const published = parsed.data.published 
      
      if (published !== false) {
        const title = parsed.data.title || '(Untitled)'
        const date = parsed.data.date ? parsed.data.date.toLocaleDateString() : undefined
        const route = r.replace(/\.md/, '.html')
        const link = await markdown(`[${title}](./${route})${date ? ` (${date}) ` : ''}`)
        return await a + link
      } else {
        return a
      }
    }, '')
  
  return await result
  
}

module.exports = indexer
