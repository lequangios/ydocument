function toogleModal() {
    const modal = document.getElementById('FormModal')
    const overlay = document.getElementById('FromOverlay')
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

AJAX_HELPER = {
    loadingHTML: function(classname) {
        if (classname == undefined) {
            classname = 'text-danger'
        }
        let doc = document.createElement('div')
        doc.className = "ajax-spiner spinner-border " + classname
        doc.setAttribute('role', 'status')
        doc.innerHTML = '<span class="sr-only"></span>'
        return doc
    },
    setButtonLoading: function(element) {
        element.append(this.loadingHTML())
        element.disabled = true
    },

    removeButtonLoading: function(element) {
        const node = element.querySelector('.ajax-spiner')
        if (node) {
            node.remove()
        }
        element.disabled = false
    }

}