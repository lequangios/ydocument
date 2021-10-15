const message = new MBMessaging(1088)
var app = {
    el: '#MBChapter',
    data: {
        chapters: [],
        modal: {
            title: '',
            url: ''
        }
    },
    computed: {

    },
    methods: {
        listChapters() {
            mbClient.listChapter().then(function(response) {
                this.chapters = response.result
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
        onEditChapter(chap) {
            const href = '../chapter/edit.html?chapter_id=' + chap.id
            if (window.top) {
                window.top.location.href = href
            } else {
                window.location.href = href
            }
        }
    },
    mounted: function() {
        this.listChapters()

    }
}
window.onload = function() {
    new Vue(app)
}