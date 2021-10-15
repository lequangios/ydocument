class Backend {
    constructor(app, express, host, port, path) {
        this.app = app
        this.express = express
        this.port = port
        this.path = path
        this.host = host
    }

    registerRoue(){
        let apiRoutes = require('./manager/document') //importing route
        apiRoutes(this.app, this.express)
    }

    start(){
        this.app.use(function(req, res) {
            res.status(404).send({url: req.originalUrl + ' not found'})
        })
        this.app.listen(this.port)
        console.log('Backend started on: ' +this.host +':'+ this.port + '/' + this.path)
        console.log('RESTful API server started on: ' +this.host +':'+ this.port + '/api/')
    }
}

module.exports = function (app, express, host, port, path) {
    let be = new Backend(app, express, host, port, path)
    be.registerRoue()
    return be
}