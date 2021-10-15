'use strict';
var apiResponse = require('./../model/ApiResponse')
module.exports = {
    get: (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('List all documents');
    },
    add:(req, res) => {
        let data = req.body
        let document = require('./../model/Document')
        document.addNewDocument(data.name, data.description, data.thumbnail, (result) => {
            console.log(result)
            console.log(result.results.insertId)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Add documents');
        })
    },
    detail: (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Detail of document with id '+req.params.documentId);
    },
    update: (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Update for document with id '+req.params.documentId);
    }
}