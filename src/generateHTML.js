const fs = require('fs').promises
const replace = require('./replacements')
const paths = require('./paths')
const parseMarkdown = require('./parseMarkdown')

/**
 * Generate HTML string from the given markdown file (filePath), the replacements defined in replacements.js,
 * and a fixed HTML template
 */
const generateHTML = async (filePath) => {
  const parsedMarkdown = await parseMarkdown(filePath)
  const replacements = await replace({data: parsedMarkdown.data, filePath, html: parsedMarkdown.content})
  const template = (await fs.readFile(paths.templatePath)).toString()

  // apply all the replacements to the HTML template string
  return {
    data: parsedMarkdown.data,
    html: replacements.reduce((a, r) => a.replace(...r), template),
  }
}

module.exports = generateHTML
