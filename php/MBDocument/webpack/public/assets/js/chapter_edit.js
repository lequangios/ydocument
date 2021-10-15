const message = new MBMessaging(1088)
const child_node_template = Vue.component('child-node-template', {
    template: '#child-node-template',
    props: {
        node: Object
    },
    methods: {
        addChildBlock(node) {
            window.node = node
            this.$emit('addchildblock', node)
            console.log(`add-child-block: ${node.type.name}`)
        },
        addChildBlockEventFire(node) {
            window.node = node
            this.$emit('addchildblock', node)
            console.log(`add-child-block from ${node.type.name} to parent`)
        },
        addChildContent(node) {
            window.node = node
            this.modal = {
                title: node.title,
                url: '/chapter/template/content_list.html'
            }
            toogleModal()
        },
        removeChild(node) {
            this.$emit('removeChildNodeEvent', node)
        },
        removChildFire(node) {
            console.log(`remove ${node.id}`)
            this.node.removeChildNode(node)
        },
        editNode(node) {
            MBMessaging.setBroadcastMessage(node)
            this.$emit('editchildnode')
            console.log(`edit ${node.type.name}`)
        },
        editNodeFire() {
            this.$emit('editchildnode')
        },
        onShowMedia: function() {
            this.modal = {
                title: 'Media',
                url: '/form/assets.html'
            }
            toogleModal()
        },
    }
})

const app = {
    el: '#MBChapterEdit',
    components: {
        'child-node-template': child_node_template
    },
    data: {
        chapter: new MBChapter(),
        state: {
            needUpdate: true,
            needShowBlock: false,
            needShowContent: false
        },
        modal: {
            title: '',
            url: ''
        },
        activeSection: undefined,
        editor: undefined,
    },
    computed: {
        updateChapterBtn: function() {
            if (this.state.needUpdate) {
                return "btn btn-primary mt-2"
            } else return "btn btn-primary mt-2 disabled"
        }
    },
    watch: {
        chapter: {
            handler: function(val) {
                //this.state.needUpdate = this.chapter.isChange(val)
            },
            deep: true
        }

    },
    methods: {
        detailChapter: function(chapter_id) {
            this.chapter.chapterDetail(chapter_id).then(function(response) {
                console.log(this.chapter)
            }.bind(this)).catch(function(error) {
                console.log(error)
            }.bind(this))
        },
        updateChapter: function() {
            this.chapter.updateChapterData()
            this.chapter.updateChapter().then(function(response) {
                console.log(response)
            }.bind(this)).catch(function(error) {

            }.bind(this))
        },
        addSection: function() {
            this.chapter.addSection()
        },
        removeSection: function(section) {
            this.chapter.removeSection(section)
        },
        editSection: function(section) {
            this.activeSection = section
            window.node = section
            this.modal = {
                title: window.node.type.name,
                url: '/chapter/template/edit_node.html'
            }
            toogleModal()
        },

        completeEditSection: function() {
            this.activeSection = undefined
            window.node = undefined
            toogleModal()
            this.modal = {
                title: '',
                url: ''
            }
            this.chapter.updateChapterData()
            this.chapter.updateChapter().then(function(response) {}.bind(this)).catch(function(error) { console.log(error) }.bind(this))
        },
        addSectionChildBlock() {
            console.log(window.node)
            this.modal = {
                title: window.node.type.name,
                url: '/chapter/template/block_list.html'
            }
            toogleModal()
        },
        addSectionChildContent(section) {
            console.log(section.allowContent)
            window.node = section
            this.modal = {
                title: section.title,
                url: '/chapter/template/content_list.html'
            }
            toogleModal()
        },
        removeChildNode(node) {
            console.log(`Need remove ${node.id}`)
        },
        editNode: function(node) {
            if (node == undefined) {
                node = MBMessaging.getBroadcastMessage()
                MBMessaging.clearBroadcastMessage()
            }
            window.node = node
            this.modal = {
                title: window.node.type.name,
                url: '/chapter/template/edit_node.html'
            }
            toogleModal()
        },
        registerMessageHandler: function() {
            MBMessaging.registerMessageHandler(1088, function(message) {
                if (message.type = "add_new_block") {
                    toogleModal()
                    const json = message.params
                    console.log(json)
                    if (window.node) {
                        this.chapter.addChapterNode(json.name, window.node)
                        window.node = undefined
                    }
                }
            }.bind(this))
        }
    },
    mounted: function() {
        const url = new URL(window.location.href)
        const chapter_id = url.searchParams.get("chapter_id")
        this.detailChapter(chapter_id)
        this.registerMessageHandler()
    }
}
window.onload = function() {
    new Vue(app)
}