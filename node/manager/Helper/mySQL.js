var mysql = require('mysql')
var YError = require('./../model/YError')

class MySQLResult {
    constructor() {
        this.error = null
        this.results = null
        this.fields = null
        this.query = ''
    }

    get isError(){
        return this.error != null
    }
}

class MySQL {
    constructor(host, user, password, name) {
        this.host = host
        this.user = user
        this.name = name
        this.password = password

        this.connection = mysql.createConnection({
            host     : this.host,
            user     : this.user,
            password : this.password,
            database : this.name,
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
        });
    }

    exclude(callback, data){
        callback(data)
    }

    query(query, callback){
        let result = new MySQLResult()
        result.query = query
        let self = this
        try {
            this.connection.connect(function(err){
                if(err) {
                    let error = YError.makeDatabaseError(err.message)
                    console.log(error)
                    throw error
                }
            })
            this.connection.query(query, function (err, results, fields) {
                if (err){
                    let message = err.message + ' and query = ' + query
                    let error = YError.makeDatabaseError(message)
                    throw error

                }
                result.results = results
                result.fields = fields
                self.exclude(callback, result)
            })
            this.connection.end()
        }
        catch (e) {
            result.error = e
            self.exclude(callback, result)
        }

    }
}

module.exports = function (query, callback) {
    let db = new MySQL("localhost", "root", "root", "mbdocument")
    db.query(query, callback)
}