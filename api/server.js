require('dotenv').config()

const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

const routers = require('./routes/APIRoutes')
routers(app)
app.listen(port)
console.log('Vault API server started on: ' + port)
