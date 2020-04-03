const md = require('markdown-it')
const hljs = require('highlight.js')

// cf. https://github.com/markdown-it/markdown-it#syntax-highlighting
const highlight = (str, lang) => {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (__) {}
  }
  return ''
}

// cf. https://github.com/markdown-it/markdown-it#init-with-presets-and-options
const markdownPreferences = {
  highlight,
  html: true,
  linkify: true,
}

/**
 * Render markdown source to HTML
 */
const markdown = (source) => md(markdownPreferences).render(source)

module.exports = markdown
