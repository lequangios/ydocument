'use strict';
module.exports = function(app, express) {
    const path = __dirname
    let documentController = require('./controller/documentController');
    let homeController = require('./controller/homeController');

    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())


    app.use('/assets', express.static(path + '/assets'))
    app.set('views', path + '/view');
    app.set('view engine', 'ejs');

    app.route('/').get(homeController.get)

    app.route('/api/documents').get(documentController.get).post(documentController.add)
    app.route('/api/document/:documentId').get(documentController.detail).put(documentController.update)
}
