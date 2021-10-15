import MB from './base/baseDocument'
import MBChapter from './mbChapter'
import { MBClient } from './mbClient'
class MBDocument extends MB {
    constructor() {
        super()
        this.chapter = [new MBChapter()]
        this.document_id = ''
        this.name = ''
        this.description = ''
        this.thumbnail = ''
        this.viewed = 0
        this.status = 1
        this.table_content = ''
        this.date_create = ''
    }

    exportJson() {
        this.setTableContent()
        return {
            id: this.id,
            document_id: this.document_id,
            name: this.name,
            description: this.description,
            thumbnail: this.thumbnail,
            table_content: this.table_content,
            status: this.status,
            viewed: this.viewed
        }
    }

    mapWithJson(json) {
        super.mapWithJson(json)
        this.setTableContent()
        console.log('document map done')
        console.log(json)
        console.log(this)
    }

    setTableContent() {
        const bg = '<ul class="table-content" id="doc-' + this.document_id + '">'
        const ed = '</ul>'
        let html = 'xxx'
            // for (const child of this.chapter) {
            //     html += child.table_content
            // }
        this.table_content = bg + html + ed
    }

    addNewChapter(json) {
        const mbClient = MBClient.shared()
        const chapter = new MBChapter()
        chapter.document_id = this.document_id
        chapter.mapWithJson(json)

        const myPromise = new Promise(function(resolve, reject) {
            mbClient.addChapter(this.document_id, chapter).then(function(response) {
                chapter.mapWithJson(response.result.chapter)
                this.chapter.push(chapter)
                resolve(response)
            }.bind(this)).catch(function(error) {
                reject(error)
            })
        }.bind(this))
        return myPromise
    }

    removeChapter(chapter) {
        this.chapter.forEach(((value, index) => {
            if (value.id == chapter.id) {
                this.chapter.splice(index, 1)
                return
            }
        }).bind(this))
    }

    updateDocument() {
        const mbClient = MBClient.shared()
        const json = this.exportJson()
        console.log(json)
        const myPromise = new Promise(function(resolve, reject) {
            mbClient.updateDocument(json).then(function(response) {
                resolve(response.result)
            }).catch(function(error) {
                reject(error)
            }.bind(this))
        }.bind(this))
        return myPromise
    }
}

export default MBDocument