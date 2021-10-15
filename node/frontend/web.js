'use strict';
module.exports = function(app, express) {
    let homeController = require('./controller/homeController');
    const path = __dirname
    app.set('views', path + '/view');
    app.set('view engine', 'ejs');
    app.use('/assets', express.static(path + '/assets'))
    app.use('/html', express.static(path + '/html'))
    app.route('/').get(homeController.get);
}