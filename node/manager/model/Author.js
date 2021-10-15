class Author {
    constructor(id, name) {
        this.id = id
        this.name = name
    }

    static initWithJson(json){
        if (json != null && json != undefined && typeof json === 'object') {
            const id = json.id ? json.id : 0
            const name = json.id ? json.id : ''
            return new Author(id, name)
        }
        return false
    }
}

module.exports = Author