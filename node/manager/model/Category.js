class Category {
    constructor(id, name, parentId) {
        this.id = id
        this.name = name
        this.parentId = parentId
    }

    static initWithJson(json){
        if (json != null && json != undefined && typeof json === 'object') {
            const id = json.id ? json.id : 0
            const name = json.id ? json.id : ''
            const parentId = json.parentId ? json.parentId : -1
            return new Category(id, name, parentId)
        }
        return false
    }
}

module.exports = Category