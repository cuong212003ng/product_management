const express = require('express')
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('express-flash')
require('dotenv').config()  

const database = require('./config/database')

const systemConfig = require('./config/system')

const route = require('./routes/client/index.route')
const adminRoute = require('./routes/admin/index.route')

database.connect()


const app = express()
const port = process.env.PORT

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'pug')
app.set('views', './views')

//Flash
app.use(cookieParser('alksdjhfaksjflk'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End Flash

//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static('public'))

//Routes
route(app)
adminRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
