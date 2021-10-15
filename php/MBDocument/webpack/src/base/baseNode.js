const NodeType = {
    Chapter: { name: "chapter", weight: 0, element: false },
    Section: { name: "section", weight: 1, element: false },
    BlockLevel1: { name: "block-level-1", weight: 2, element: false },
    BlockLevel2: { name: "block-level-2", weight: 3, element: false },
    BlockLevel3: { name: "block-level-3", weight: 4, element: false },
    BlockLevel4: { name: "block-level-4", weight: 5, element: false },
    BlockLevel5: { name: "block-level-5", weight: 6, element: false },
    Grid: { name: "grid", weight: -1, element: false },
    Row: { name: "row", weight: -2, element: true },
    Column: { name: "column", weight: 7, element: true },
    Body: { name: "body", weight: 7, element: true },
    Paragraph: { name: "paragraph", weight: 8, element: true }, // WYSWYG block
}

class Node {
    constructor(id) {
        this.id = id
        this.title = ''
        this.child = [] // Node like tree
        this.content = ''
        this.isBookMark = false
        this.prarentNode = null
        this.level = 0
        this.length = this.child.length // Total child node
        this.order = 0
        this.isNeedBullet = false
        this.type = NodeType.Body
    }

    get allowItemBlock() {
        let list = []
        for (const [key, value] of Object.entries(NodeType)) {
            if (value.element == false && (value.weight > this.type.weight || value.weight < 0)) {
                list.push(value)
            }
        }
        return list
    }

    get allowContent() {
        let list = []
        for (const [key, value] of Object.entries(NodeType)) {
            if (value.element == true) {
                list.push(value)
            }
        }
        return list
    }

    get isSection() {
        return this.type.name == NodeType.Section.name
    }

    get isBlock() {
        return this.type.element == false
    }

    get idCSS() {
        return this.type.name + '-id-' + this.id
    }

    get classCSS() {
        return this.type.name + '-node'
    }

    get beginTag() {
        return '<div id="' + this.idCSS + '" class="' + this.classCSS + '">'
    }

    get closeTag() {
        return '</div>'
    }

    get beginChildTag() {
        return ''
    }

    get closeChildTag() {
        return ''
    }

    get nexChildId() {
        return 'l' + this.level + 'c' + this.length
    }

    get bullet() {
        if (this.isNeedBullet) {
            return '<span class="bullet">' + this.levelTag() + '</span>'
        }
        return ''
    }

    buildChildId(length) {
        return 'l' + this.level + 'c' + length
    }

    levelTag() {
        let tag = '';
        if (this.parentNode != null) {
            tag = this.parentNode.levelTag() + '.' + tag
        }
        tag = tag + (this.level + 1) + '.'
    }

    static nodeWithType(type, id) {
        let node = false
        console.log(type)
        switch (type) {
            case NodeType.Chapter.name:
                node = new Chappter(id)
                break
            case NodeType.Section.name:
                node = new Section(id)
                break
            case NodeType.Row.name:
                node = new Row(id)
                break
            case NodeType.Column.name:
                node = new Column(id)
                break
            case NodeType.BlockLevel1.name:
                node = new BlockLevel1(id)
                break
            case NodeType.BlockLevel2.name:
                node = new BlockLevel2(id)
                break
            case NodeType.BlockLevel3.name:
                node = new BlockLevel3(id)
                break
            case NodeType.BlockLevel4.name:
                node = new BlockLevel4(id)
                break
            case NodeType.BlockLevel5.name:
                node = new BlockLevel5(id)
                break
            case NodeType.Paragraph.name:
                node = new Paragraph(id)
                break
            default:
                node = new Body(id)
        }
        return node
    }

    static addChildNode(typename, parentNode) {
        if (parentNode != undefined) {
            parentNode.addNewChildNode(typename)
        }
    }

    static removeChildNode(node, parentNode) {
        if (parentNode != undefined && node != undefined) {
            parentNode.removeChildNode(node)
        }
    }

    nodeWithJson(json) {
        const node = this
        if (json != null && json != undefined && typeof json === 'object') {
            node.id = json.id ? json.id : node.id
            node.title = json.title ? json.title : node.title
            node.order = json.order ? json.order : node.order
            node.level = json.level ? json.level : node.level
            node.length = json.length ? json.length : node.length
            node.content = json.content ? json.content : node.content
            node.isBookMark = json.isBookMark ? json.isBookMark : node.isBookMark
            const childJson = json.child ? json.child : node.child
            for (const ele of childJson) {
                node.buildChildNode(ele)
            }
            node.updateExtraNodeInfo(json)
        }
    }

    updateExtraNodeInfo(json) {

    }

    toJson() {
        return JSON.stringify(this)
    }

    buildChildNode(json) {
        if (json != null && json != undefined && typeof json === 'object') {
            const type = json.type ? json.type.name : NodeType.Body.name
            let node = Node.nodeWithType(type, this.nexChildId)
            node.nodeWithJson(json)
            node.updateExtraNodeInfo(json)
            this.addChildNode(node)
        }
    }

    /* Node */
    sortChildNode() {
        this.child.sort(function(a, b) {
            return a.order < b.order
        })
        this.child.map((ele, index) => {
            ele.order = index
            return ele
        })
    }

    addChildNode(node) {
        if (node) {
            node.level = this.level + 1
            node.order = this.child.length
            this.child.push(node)
            this.length += 1
        }
    }

    addNewChildNode(typename) {
        const id = this.nexChildId
        const node = Node.nodeWithType(typename, id)
        this.addChildNode(node)
    }

    removeChildNode(node) {
        const index = this.child.findIndex((ele) => ele.id == node.id)
        this.child.splice(index, 1)
        this.child.map(function(ele, index) {
            ele.id = this.buildChildId(index)
            ele.order = index
            return ele
        }.bind(this))

        // this.child.map((ele, index) => {
        //     ele.id = this.buildChildId(index)
        //     ele.order = index
        //     return ele
        // }).bind(this)
        this.length -= 1
    }

    removeChildNodeByIndex(index) {
        this.child.splice(index, 1)
        this.child.map(function(ele, index) {
                ele.id = this.buildChildId(index)
                ele.order = index
                return ele
            }.bind(this))
            // this.child.map((ele, index) => {
            //     ele.id = this.buildChildId(index)
            //     ele.order = index
            //     return ele
            // }).bind(this)
        this.length -= 1
    }

    get htmlContent() {
        if (this.content != '') {
            if (this.type.element) {
                return '<p class="title">' + this.content + '</p>'
            } else {
                return '<p class="title">' + this.bullet + ' ' + this.content + '</p>'
            }
        }
        return ''
    }

    get tableContent() {
        if (this.type.element == false && this.title != '') {
            let html = '<li class="tb-item-level-' + this.level + '" data-id="' + this.id + '">' + this.bullet + this.title + '</li>'
            if (this.child.length > 0) {
                const bg = '<ul class="tb-level-' + this.level + '">'
                const ed = '</ul>'
                let str = ''
                for (const child of this.child) {
                    console.log(child)
                    str += child.tableContent
                }
                return html = html + (bg + str + ed)
            }
            console.log(html)
            return html
        } else return ''
    }

    render() {
        let html = this.beginTag
        html += this.htmlContent
        for (let node of this.child) {
            html += this.beginChildTag
            html += node.render()
            html += this.closeChildTag
        }
        html += this.closeTag
        return html
    }
}

class Chappter extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.Chapter
    }

    get beginTag() {
        return '<article id="' + this.idCSS + '" class="' + this.classCSS + '">'
    }

    get closeTag() {
        return '</article>'
    }

    get htmlContent() {
        let html = ''
        if (this.title != '') {
            html += '<h1>' + this.bullet + this.title + '</h1>'
        }
        if (this.content != '') {
            html += `<div class="chapter-content">${this.content}</div>`
        }
        return html
    }
}

class Section extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.Section
    }

    get beginTag() {
        return '<section id="' + this.idCSS + '" class="' + this.classCSS + '">'
    }

    get closeTag() {
        return '</section>'
    }

    get htmlContent() {
        let html = ''
        if (this.title != '') {
            html += '<h1>' + this.bullet + this.title + '</h1>'
        }
        if (this.content != '') {
            html += `<div class="section-content">${this.content}</div>`
        }
        return html
    }
}

class Column extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.Column
    }

    get beginTag() {
        let cls = 'col ' + this.classCSS
        if (this.colWidth > 0 && this.colWidth <= 12) {
            cls = 'col-' + this.colWidth + ' ' + this.classCSS
        }
        return '<div id="' + this.idCSS + '" class="' + cls + '">'
    }

    get closeTag() {
        return '</div>'
    }
}

class Row extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.Row
    }

    get beginTag() {
        return '<div id="' + this.idCSS + '" class="row ' + this.classCSS + '">'
    }

    get closeTag() {
        return '</div>'
    }
}

class BlockLevel1 extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.BlockLevel1
    }


    get htmlContent() {
        return '<h1 class="title">' + this.levelTag() + ' ' + this.content + '</h1>'
    }
}

class BlockLevel2 extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.BlockLevel2
    }

    get htmlContent() {
        return '<h2 class="title">' + this.levelTag() + ' ' + this.content + '</h2>'
    }
}

class BlockLevel3 extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.BlockLevel3
    }


    get htmlContent() {
        return '<h3 class="title">' + this.levelTag() + ' ' + this.content + '</h3>'
    }
}

class BlockLevel4 extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.BlockLevel4
    }


    get htmlContent() {
        return '<h4 class="title">' + this.levelTag() + ' ' + this.content + '</h4>'
    }
}

class BlockLevel5 extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.BlockLevel5
    }


    get htmlContent() {
        return '<h5 class="title">' + this.levelTag() + ' ' + this.content + '</h5>'
    }
}

class Body extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.Body
    }

}

class Paragraph extends Node {
    constructor(id) {
        super(id)
        this.type = NodeType.Paragraph
    }

}

export {
    NodeType,
    Node,
    Chappter,
    Section,
    Column,
    Row,
    BlockLevel1,
    BlockLevel2,
    BlockLevel3,
    BlockLevel4,
    BlockLevel5,
    Body,
    Paragraph
}