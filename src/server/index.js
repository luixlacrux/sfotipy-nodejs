import http from 'http'
import express from 'express'
import swig from 'swig'
import consolidate from 'consolidate'
import api from 'src/server/api'
import router from 'src/server/routers'
//import router from './routers'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.engine('html', consolidate.swig)
app.set('view engine', 'html')
app.set('views', 'views')

app.use('/api', api)
app.use('/', router)

server.listen(port, () => console.log(`Server listening on port ${port}`))

