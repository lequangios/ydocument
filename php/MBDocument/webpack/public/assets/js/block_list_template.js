var blockListTemplate = Vue.component('block-list-template', {
    template: '#block-list-template',
    data() {
        return {

        }
    },
    computed: {
        block() {
            if (this.node) {
                return this.node.allowItemBlock
            } else return []
        }
    },
    watch: {
        toogle() {
            this.toogleModal()
        }
    },
    props: {
        node: Object,
        toogle: Boolean
    },
    methods: {
        toogleModal() {
            const modal = document.getElementById('block-list-template')
            const overlay = document.getElementById('block-list-template-overlay')
            if (modal.style.display != "block") {
                modal.style.display = "block"
                overlay.style.display = "block"
                document.body.style.overflow = "hidden"
            } else {
                modal.style.display = "none"
                overlay.style.display = "none"
                document.body.style.overflow = ""
            }
        }
    }
});