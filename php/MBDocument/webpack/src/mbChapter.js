import { NodeType, Node, Chappter, Section, Column, Row, BlockLevel1, BlockLevel2, BlockLevel3, BlockLevel4, BlockLevel5, Body, Paragraph } from './base/baseNode'
import { MBClient } from './mbClient'
class MBChapterDatabase {
    constructor() {
        this.id = ''
        this.document_id = ''
        this.chapter_order = ''
        this.title = ''
        this.thumbnail = ''
        this.content = ''
        this.isBookMark = 0
        this.level = 0
        this.length = 0
        this.child = ''
        this.date_create = ''
        this.date_update = ''
        this.html_content = ''
        this.table_content = ''
        this.status = 1
        this.viewed = 0
        this.node = undefined
        this.makeRootNode()
    }

    getChildContent() {
        if (this.child == '') {
            return {
                child: {}
            }
        } else {
            return JSON.parse(this.child)
        }
    }

    setChildContent(value) {
        this.child = JSON.stringify(value)
    }

    setHtmlContent(node) {
        this.html_content = node.render()
    }

    setTableContent(node) {
        if (node) {
            console.log(node)
            this.table_content = node.tableContent
        }
    }

    updateChapterData() {
        this.setChildContent(this.node)
        this.setHtmlContent(this.node)
        this.setTableContent(this.node)
    }

    buildTreeNode() {
        const json = this.getChildContent()

        // Build root node
        this.node = Node.nodeWithType(NodeType.Chapter.name, this.id)
        this.node.title = this.title
        this.node.content = this.content
        this.node.isBookMark = this.isBookMark > 0
        this.node.level = this.level
        this.node.length = this.length
        this.node.order = this.order

        // Build Child Node
        this.node.nodeWithJson(json)
        this.updateChapterData()
    }

    makeRootNode() {
        const node = Node.nodeWithType(NodeType.Chapter.name, this.id)
        node.title = this.title
        node.content = this.content
        node.isBookMark = this.isBookMark > 0
        node.level = this.level
        node.length = this.length
        node.order = 0
        this.setChildContent(node)
        this.setHtmlContent(node)
        this.setTableContent(node)
            //this.buildTreeNode()
    }

    isChange(val) {
        console.log(val)
        const test = this.chapter_order != val.chapter_order ||
            this.title != val.title ||
            this.thumbnail != val.thumbnail ||
            this.isBookMark != val.isBookMark ||
            this.child != val.child ||
            this.status != val.status
        return test
    }

    mapWithJson(json) {
        for (const [key, value] of Object.entries(this)) {
            if (json[key] != undefined) {
                const type = typeof value
                if (type == 'number') {
                    this[key] = Number(json[key])
                } else {
                    this[key] = String(json[key])
                }
            }
        }
        console.log(json)
        this.buildTreeNode()
    }

    exportJson() {
        this.updateChapterData()
        return {
            id: this.id,
            document_id: this.document_id,
            chapter_order: this.chapter_order,
            title: this.title,
            thumbnail: this.thumbnail,
            content: this.content,
            isBookMark: this.isBookMark,
            level: this.level,
            length: this.length,
            child: this.child,
            date_create: this.date_create,
            date_update: this.date_update,
            html_content: this.html_content,
            table_content: this.table_content,
            status: this.status,
            viewed: this.viewed
        }
    }

    chapterDetail(chapter_id) {
        const mbClient = MBClient.shared()
        const myPromise = new Promise(function(resolve, reject) {
            mbClient.detailChapter(chapter_id).then(function(response) {
                this.mapWithJson(response.result.chapter)
                console.log(this)
            }.bind(this)).catch(function(error) {
                reject(error)
            }.bind(this))
        }.bind(this))
        return myPromise
    }

    updateChapter() {
        const mbClient = MBClient.shared()
        const json = this.exportJson()
        const myPromise = new Promise(function(resolve, reject) {
            mbClient.updateChapter(json).then(function(response) {
                resolve(response.result)
            }.bind(this)).catch(function(error) {
                reject(error)
            }.bind(this))
        }.bind(this))
        return myPromise
    }
}

class MBChapter extends MBChapterDatabase {
    constructor() {
        super()
    }

    addChapterNode(typename, parentNode) {
        Node.addChildNode(typename, parentNode)
        this.updateChapter()
    }

    removeChapterNode(typename, parentNode) {
        Node.removeChildNode(typename, parentNode)
        this.updateChapter()
    }

    addSection() {
        this.addChapterNode(NodeType.Section.name, this.node)
    }

    removeSection(section) {
        this.removeChapterNode(NodeType.Section.name, this.node)
    }

    nodeTypeList(json) {
        this.nodetypes = []
        for (const item of json) {
            item.value = JSON.parse(item.value.replace("\\", ""))
            this.nodetypes.push(item)
        }
    }

}

export default MBChapter