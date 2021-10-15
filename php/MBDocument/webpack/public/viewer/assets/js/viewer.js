var app = {
    el: '#document',
    data() {
        return {
            document: undefined
        }
    },
    computed: {

    },
    watch: {

    },
    methods: {
        getDocument: function(document_id) {
            mbClient.viewDocument(document_id).then(function(response) {
                this.document = response.result.document
                console.log(this.document)
            }.bind(this)).catch(function(error) {
                console.log(error)
            })
        }
    },
    mounted: function() {
        const url = new URL(window.location.href)
        const document_id = url.searchParams.get("document_id")
        this.getDocument(document_id)
    }
}
new Vue(app)