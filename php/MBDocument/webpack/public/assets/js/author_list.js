const message = new MBMessaging(1088)
var app = {
    el: '#MBAuthor',
    data: {
        authors: [],
        modal: {
            title: '',
            url: ''
        }
    },
    computed: {

    },
    methods: {
        listAuthors() {
            mbClient.listAuthor().then(function(response) {
                this.authors = response.result
                console.log(this.authors)
            }.bind(this)).catch(function(error) {
                console.log(error)
            }.bind(this))
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
    },
    mounted: function() {
        this.listAuthors()

    }
}
window.onload = function() {
    new Vue(app)
}