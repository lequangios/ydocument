const message = new MBMessaging(1088)

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        console.log('hello world')
        return {};
    };
}

const section_node_template = Vue.component('section-node-template', {
    template: '#section-node-template',
    data: {
        editor: undefined
    },
    props: {
        node: Object
    },
    methods: {
        saveNode: function() {
            this.node.content = this.editor.getData()
            this.$emit('saveupdatenode')
        }
    },
    mounted: function() {
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                this.editor = editor
            })
            .catch(error => {
                console.error(error);
            });
    }
})

const block_level_1 = Vue.component('block-level-1', {
    template: '#block-level-1',
    data: {
        editor: undefined
    },
    props: {
        node: Object
    },
    methods: {
        saveNode: function() {
            this.node.content = this.editor.getData()
            this.$emit('saveupdatenode')
        }
    },
    mounted: function() {
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                this.editor = editor
            })
            .catch(error => {
                console.error(error);
            });
    }
})

const block_level_2 = Vue.component('block-level-2', {
    template: '#block-level-2',
    data: {
        editor: undefined
    },
    props: {
        node: Object
    },
    methods: {
        saveNode: function() {
            this.node.content = this.editor.getData()
            this.$emit('saveupdatenode')
        }
    },
    mounted: function() {
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                this.editor = editor
            })
            .catch(error => {
                console.error(error);
            });
    }
})

const block_level_3 = Vue.component('block-level-3', {
    template: '#block-level-3',
    data: {
        editor: undefined
    },
    props: {
        node: Object
    },
    methods: {
        saveNode: function() {
            this.node.content = this.editor.getData()
            this.$emit('saveupdatenode')
        }
    },
    mounted: function() {
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                this.editor = editor
            })
            .catch(error => {
                console.error(error);
            });
    }
})

const block_level_4 = Vue.component('block-level-4', {
    template: '#block-level-4',
    data: {
        editor: undefined
    },
    props: {
        node: Object
    },
    methods: {
        saveNode: function() {
            this.node.content = this.editor.getData()
            this.$emit('saveupdatenode')
        }
    },
    mounted: function() {
        ClassicEditor
            .create(document.querySelector('#editor'))
            .then(editor => {
                this.editor = editor
            })
            .catch(error => {
                console.error(error);
            });
    }
})

const block_level_5 = Vue.component('block-level-5', {
    template: '#block-level-5',
    data: {
        editor: undefined
    },
    props: {
        node: Object
    },
    methods: {
        saveNode: function() {
            this.node.content = this.editor.getData()
            this.$emit('saveupdatenode')
        }
    },
    mounted: function() {
        ClassicEditor
            .create(document.querySelector('#editor'), {
                plugins: [EasyImage, Image],
            })
            .then(editor => {
                this.editor = editor
            })
            .catch(error => {
                console.error(error);
            });
    }
})

var app = {
    el: '#block-list-template',
    data() {
        return {
            node: undefined
        }
    },
    components: {
        'section-node-template': section_node_template,
        'block-level-1': block_level_1,
        'block-level-2': block_level_2,
        'block-level-3': block_level_3,
        'block-level-4': block_level_4,
        'block-level-5': block_level_5
    },
    computed: {
        block() {
            if (this.node) {
                return this.node.allowItemBlock
            } else return []
        }
    },
    watch: {

    },
    methods: {
        selectBlock: function(block) {
            console.log('add_new_block')
            message.sendMessage('add_new_block', block);
        },
        saveUpdate: function() {
            console.log(this.node.content)
        }

    },
    mounted: function() {
        if (window.top && window.top.node) {
            this.node = window.top.node
        }
    }
}
new Vue(app)