class Frontend {
    constructor(app, express, host, port, path) {
        this.app = app
        this.express = express
        this.port = port
        this.path = path
        this.host = host
    }

    registerRoue(){
        let webRoutes = require('./frontend/web') //importing route
        webRoutes(this.app, this.express)
    }

    start(){
        this.app.use(function(req, res) {
            res.status(404).send({url: req.originalUrl + ' not found'})
        })
        this.app.listen(this.port)
        console.log('Frontend started on: ' +this.host +':'+ this.port + '/' + this.path)
    }
}

module.exports = function (app, express, host, port, path) {
    let fe = new Frontend(app, express, host, port, path)
    fe.registerRoue()
    return fe
}