const generateHTML = require('./generateHTML')

/**
 * The engine that returns HTML from a given path
 */
const markdownEngine = async (filePath, options, callback) => {
  try {
    const output = await generateHTML(filePath)
    if (output.data.published !== false){
      return callback(null, output.html)
    } else {
      return callback(null, '<script>window.location = "/"</script>')
    }
  } catch (e) {
    return callback(e)
  }
}

module.exports = markdownEngine
