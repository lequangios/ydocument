const message = new MBMessaging(1088)
var app = {
    el: '#MBCategory',
    data: {
        categories: [],
        modal: {
            title: '',
            url: ''
        }
    },
    computed: {

    },
    methods: {
        listCategories() {
            mbClient.listCategory().then(function(response) {
                this.categories = response.result
                console.log(this.chapters)
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
        this.listCategories()

    }
}
window.onload = function() {
    new Vue(app)
}