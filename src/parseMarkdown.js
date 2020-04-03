const fs = require('fs').promises
const markdown = require('./renderMarkdown')
const matter = require('gray-matter')

/**
 * Use gray-matter to parse markdown with frontmatter, then use markdown-it to render HTML string from markdown content.
 *
 * @param filePath string
 * @returns {
 *   content: string,
 *   data: {[key: string]: string},
 *   isEmpty: boolean,
 *   excerpt: string,
 * }
 */
const parseMarkdown = async (filePath) => {
  const file = await fs.readFile(filePath)
  const parsedMarkdown = matter(file.toString(), {excerpt: true})
  return {
    ...parsedMarkdown,
    content: markdown(parsedMarkdown.content),
  }
}

module.exports = parseMarkdown
