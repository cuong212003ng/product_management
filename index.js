const express = require('express')
const path = require('path')
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('express-flash')
var slug = require('mongoose-slug-updater');

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
app.set('views', `${__dirname}/views`)

//Flash
app.use(cookieParser('alksdjhfaksjflk'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End Flash

//TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//End TinyMCE

//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static(`${__dirname}/public`))

//Routes
route(app)
adminRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
