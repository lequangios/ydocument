'use strict';
module.exports = {
    get: (req, res) => {
        res.render('./page/home', {page_title:'Home'});
    }
}