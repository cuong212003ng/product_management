const express = require('express')
require('dotenv').config()  

const database = require('./config/database')

const systemConfig = require('./config/system')

const route = require('./routes/client/index.route')
const adminRoute = require('./routes/admin/index.route')

database.connect()


const app = express()
const port = process.env.PORT

app.set('view engine', 'pug')
app.set('views', './views')

//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static('public'))

//Routes
route(app)
adminRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
