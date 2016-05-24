import http from 'http'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import swig from 'swig'
import consolidate from 'consolidate'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import morgan from 'morgan'
import configDB from 'src/server/config/database'

// set up redis to presistent session
const RedisStore = require('connect-redis')(session)

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

// set up express
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  store: new RedisStore({ host : "127.0.0.1", port : 6379, db : 2,}),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
app.use(flash()) // use connect-flash for flash messages stored in session

// pass passport for configuration
import setupPassport from 'src/server/config/passport'
setupPassport(app)

// used morgan to view every request to the console
app.use(morgan('dev'))

// set up template engine
app.engine('html', consolidate.swig)
app.set('view engine', 'html')
app.set('views', 'views')

// set routes application
import routes from 'src/server/routes'
routes(app, passport)

// set routes api
import api from 'src/server/api'
api('/api', app, passport)

// launch
server.listen(port, () => console.log(`Server listening on port ${port}`))
