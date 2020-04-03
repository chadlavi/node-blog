const express = require('express')
const app = express()
const paths = require('./paths')
const markdownEngine = require('./markdownEngine')

app.engine('md', markdownEngine) // define the template engine
app.set('views', paths.views) // specify the views directory
app.set('view engine', 'md') // register the template engine

app.use(express.static('public'))

app.get('/', (request, response) => {
  response.render('index')
})

app.use((request, response, next) => {
  try {
    let path = request.url.split('?')[0]
    response.render(path.slice(1))
  } catch (e) {
    console.warn(e)
    next()
  }
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(404).redirect('/')
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
