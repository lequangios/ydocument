import MBDocument from './mbDocument'
import { MBClient } from './mbClient'

class MBDocumentList {
    constructor() {
        this.documents = []
    }

    mapWithJson(json) {
        this.documents = []
        for (const item of json) {
            const doc = new MBDocument();
            doc.mapWithJson(item)
            this.documents.push(doc)
        }
    }

    addNewDocument(json) {
        const mbClient = MBClient.shared()
        const document = new MBDocument()
        document.mapWithJson(json)

        const myPromise = new Promise(function(resolve, reject) {
            mbClient.addDocument(document).then(function(response) {
                document.mapWithJson(response.result.document)
                this.documents.push(document)
                resolve(response)
            }.bind(this)).catch(function(error) {
                reject(error)
            }.bind(this))
        }.bind(this))
        return myPromise
    }
}

export default MBDocumentList