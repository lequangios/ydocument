const message = new MBMessaging(1088)
var app = {
    el: '#MBAssets',
    data: {
        assets: [],
        directory: '',
        selectedItem: undefined
    },
    computed: {
        button() {
            let btn = {
                txt: '',
                status: false,
                type: ''
            }
            if (this.selectedItem) {
                if (this.selectedItem.type == 'directory') {
                    btn = {
                        txt: 'Open',
                        status: true,
                        type: this.selectedItem.type
                    }
                } else if (this.selectedItem.type == 'image') {
                    btn = {
                        txt: 'Select',
                        status: true,
                        type: this.selectedItem.type
                    }
                } else if (this.selectedItem.type == 'zip') {
                    btn = {
                        txt: 'View',
                        status: true,
                        type: this.selectedItem.type
                    }
                }
            }
            return btn
        }
    },
    methods: {
        getAllAssets: function() {
            mbClient.listAssets(this.directory).then(function(response) {
                this.assets = response.result
                console.log(this.assets)
            }.bind(this)).catch(function(error) {
                console.log(error)
            }.bind(this))
        },
        onSelectAssets: function(item, index) {
            this.selectedItem = item
            this.directory = item.path
            const nodes = document.querySelectorAll('ul.assets li.item a')
            nodes.forEach(((ele, i) => {
                if (i == index) {
                    ele.classList.add('active')
                } else {
                    ele.classList.remove('active')
                }
            }).bind(this))
        },
        onButtonClick: function() {
            if (this.button.type == 'directory') {
                this.onOpenDirectory()
            } else if (this.button.type == 'image') {
                message.sendMessage('select_image', { 'url': this.selectedItem.href });
            } else if (this.button.type == 'zip') {
                this.onOpenDirectory()
            }
        },
        onBackToParnetDirectory: function() {
            if (this.directory && this.directory != '') {
                this.directory = this.directory.substring(0, this.directory.lastIndexOf('/'))
                this.onOpenDirectory()
            }
        },
        onOpenDirectory: function() {
            mbClient.listAssets(this.directory).then(function(response) {
                this.assets = response.result
                this.selectedItem = undefined
                console.log(this.assets)
            }.bind(this)).catch(function(error) {
                console.log(error)
            }.bind(this))
        }
    },
    mounted: function() {
        this.getAllAssets()
    }
}
new Vue(app)