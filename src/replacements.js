const defaults = require('./defaults')
const markdown = require('./renderMarkdown')
const indexer = require('./indexer')
const paths = require('./paths')

const ifIndex = (filePath) => Boolean(filePath.match(/index\.md/g))

const returnIfNotIndex = (filePath, value) => !ifIndex(filePath) ? value : '' 

/* formatting helpers */

const formatNav = (filePath) => returnIfNotIndex(filePath, `<nav><a href="${paths.root}/index.html">Chad Lavimoniere</a></nav>`)

const formatIndex = async (filePath) => ifIndex(filePath) ? await indexer() : ''

const formatTitle = (title) => `${title && title !== defaults.title ? `${title.replace(/`/g, '')} - ` : ''}${defaults.title}`

const formatH1 = (title) => title ? markdown(`# ${title}`) : ''

const formatDate = (date) => date ? `<h2 class="date">${date.toLocaleDateString()}</h2>` : '' 

const formatFooter = (filePath) => returnIfNotIndex(filePath, `<footer><a href="${paths.root}/index.html">home</a></footer>`)

/**
 * Define all the replacements you want to make in the markdown here.
 * Generally each thing you add in the frontmatter will need a replacement.
 *
 * These are used in generateHTML.js
 *
 * @returns Array<[string | RegExp, string]>
 */
const replacements = async ({
  data,
  filePath,
  html,
}) => ([
  [
    /<!-- ROOT -->/g,
    paths.root,
  ],
  [
    '<!-- DESCRIPTION -->',
    data.description || defaults.meta.description,
  ],
  [
    '<!-- NAV -->',
    formatNav(filePath),
  ],
  [
    /<!-- TITLE -->/g,
    formatTitle(data.title),
  ],
  [
    '<!-- H1 -->',
    formatH1(data.title),
  ],
  [
    '<!-- DATE -->',
    formatDate(data.date),
  ],
  [
    '<!-- RENDERED CONTENT -->',
    html,
  ],
  [
    '<!-- INDEX -->',
    await formatIndex(filePath),
  ],
  [
    '<!-- FOOTER -->',
    formatFooter(filePath),
  ],
])

module.exports = replacements
