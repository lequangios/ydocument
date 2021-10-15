// const fs = require('fs')
// var Author = require('./Author')
// var Category = require('./Category')
//
//
// class Document {
//     constructor(name, author, category, chapters) {
//         const d = new Date()
//         this.id = Math.floor(d.getTime()/1000)
//         this.name = name
//         this.author = author
//         this.category = category
//         this.chapters = chapters
//
//         this.saveDocument()
//     }
//
//     static initWithJson(json){
//         if (json != null && json != undefined && typeof json === 'object') {
//
//         }
//         return false
//     }
//
//     get filename(){
//         return './../../data/document' + this.id + '.json'
//     }
//
//     toJson(){
//         return JSON.stringify(this)
//     }
//
//     saveDocument(){
//         try {
//             let json = this.toJson()
//             fs.writeFileSync(this.filename, json)
//         }
//         catch (e) {
//             console.log(e)
//         }
//     }
// }

module.exports = {
    addNewDocument:function (name, description, thumbnail, callback) {
        var DB = require('./../Helper/mySQL')
        let query = "INSERT INTO document(name, description, thumbnail) VALUES('"+name+"','"+description+"', '"+thumbnail+"')"
        DB(query, callback)
    },
   updateDocument:function (id, name, description, thumbnail, callback) {

   }
}