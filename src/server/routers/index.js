import express from 'express'
import bodyParser from 'body-parser'


const router = express.Router()
let index = (req, res) => res.render('index')
let login = (req, res) => res.render('login')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.use(express.static('public'))
router.get('/', index)
router.get('/login', login)
router.get('/@:username', index)
router.get('/album/:name', index)
router.get('/search/:query', index)

export default router