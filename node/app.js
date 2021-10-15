const express = require('express')
const feApp = express()
const beApp = express()
const port1 = 3000
const port2 = 3001
const host = "http://127.0.0.1"

let feRoutes = require('./frontend')
let feServer = feRoutes(feApp,express, host, port1, '')
feServer.start()

let beRoutes = require('./backend')
let beServer = beRoutes(beApp,express, host, port2, '')
beServer.start()

// let apiRoutes = require('./manager/document') //importing route
// apiRoutes(app, express)
//
// let webRoutes = require('./frontend/web') //importing route
// webRoutes(feApp, express)
//
// feApp.use(function(req, res) {
//     res.status(404).send({url: req.originalUrl + ' not found'})
// })
// feApp.listen(port)
//
// console.log('RESTful API server started on: ' +host +':'+ port + '/api/')
// console.log('Backend started on: ' +host +':'+ port + '/manager/')
// console.log('Frontend started on: ' +host +':'+ port + '/')