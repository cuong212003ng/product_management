const express = require('express')

const route = require('./routes/client/index.route')

const app = express()

require('dotenv').config()
const port = process.env.PORT

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.static('public'))

//Route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
