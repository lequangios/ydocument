const message = new MBMessaging(1088)
const app = {
    el: '#MBDocument',
    data: {
        mbDocumentList: mbDocumentList,
        modal: {
            title: '',
            url: ''
        }
    },
    computed: {
        documents() {
            return this.mbDocumentList.documents
        }
    },
    methods: {
        showModal: function(title, url) {

        },
        listDocument: function() {
            mbClient.listDocument().then(function(response) {
                this.mbDocumentList.mapWithJson(response.result)
            }.bind(this)).catch(function(error) {
                console.log(error)
            }.bind(this))
        },
        onAddNewDocument: function() {
            this.modal = {
                title: 'Add new document',
                url: '/form/new_document.html'
            }
            toogleModal()
        },
        onEditDocument: function(doc) {
            this.modal = {
                title: doc.name,
                url: '/form/detail_document.html?document_id=' + doc.document_id
            }
            toogleModal()
        },
        onViewDocument: function(doc) {
            return '/viewer/document.html?document_id=' + doc.document_id
        },
        onCloseModal: function() {
            toogleModal()
        },
        onShowMedia: function() {
            this.modal = {
                title: 'Media',
                url: '/form/assets.html'
            }
            toogleModal()
        },
        registerMessageHandler: function() {
            MBMessaging.registerMessageHandler(1088, function(message) {
                if (message.type = "add_new_document") {
                    toogleModal()
                    const json = message.params
                    this.mbDocumentList.addNewDocument(json).then(function(response) {
                        console.log(response)
                    }.bind(this)).catch(function(error) {
                        console.log(error)
                    }.bind(this))
                }
            }.bind(this))
        }
    },
    mounted: function() {
        this.listDocument()
        this.registerMessageHandler()
    }
}

window.onload = function() {
    new Vue(app)
}