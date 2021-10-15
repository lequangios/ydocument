const ErrorCode = {
    Database:10,
    ItemNotFound:11,
    DataParser:12
}
class YError extends Error{
    constructor(code, title, massage) {
        super(massage)
        this.code = code
        this.title = title
    }

    static makeDatabaseError(massage){
        const title = "yDocument"
        return new YError(ErrorCode.Database,title, massage)
    }
}

module.exports = YError