var yError = require('./YErrorError')
class ApiResponse {
    constructor(code, error, data) {
        this.code = code
        this.error = error
        this.data = data
    }

    static successCode(){
        return 200
    }

    output(){
        if(this.code == ApiResponse.successCode()) {
            return {
                code : this.code,
                data : this.data,
                error_message: '',
                error_title: ''
            }
        }
        return {
            code : this.code,
            data : {},
            error_message: this.error.message,
            error_title: this.error.title
        }
    }
}

module.exports = ApiResponse