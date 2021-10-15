import Node from "./base/baseNode"
class Chappter extends Node {
    constructor(id) {
        super(id)
    }
    get type() {
        return NodeType.Chapter
    }

    get beginTag() {
        return '<article id="' + this.idCSS + '" class="' + this.classCSS + '">'
    }

    get closeTag() {
        return '</article>'
    }
}

class Section extends Node {
    constructor(id) {
        super(id)
    }
    get type() {
        return NodeType.Section
    }

    get beginTag() {
        return '<article id="' + this.idCSS + '" class="' + this.classCSS + '">'
    }

    get closeTag() {
        return '</article>'
    }
}

class Column extends Node {
    constructor(id) {
        super(id)
    }

    get type() {
        return NodeType.Column
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
    }
    get type() {
        return NodeType.Row
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
    }
    get type() {
        return NodeType.BlockLevel1
    }

    get htmlContent() {
        return '<h1 class="title">' + this.levelTag() + ' ' + this.content + '</h1>'
    }
}

class BlockLevel2 extends Node {
    constructor(id) {
        super(id)
    }
    get type() {
        return NodeType.BlockLevel2
    }

    get htmlContent() {
        return '<h2 class="title">' + this.levelTag() + ' ' + this.content + '</h2>'
    }
}

class BlockLevel3 extends Node {
    constructor(id) {
        super(id)
    }
    get type() {
        return NodeType.BlockLevel3
    }

    get htmlContent() {
        return '<h3 class="title">' + this.levelTag() + ' ' + this.content + '</h3>'
    }
}

class BlockLevel4 extends Node {
    constructor(id) {
        super(id)
    }
    get type() {
        return NodeType.BlockLevel4
    }

    get htmlContent() {
        return '<h4 class="title">' + this.levelTag() + ' ' + this.content + '</h4>'
    }
}

class BlockLevel5 extends Node {
    constructor(id) {
        super(id)
    }
    get type() {
        return NodeType.BlockLevel5
    }

    get htmlContent() {
        return '<h5 class="title">' + this.levelTag() + ' ' + this.content + '</h5>'
    }
}

class Body extends Node {
    constructor(id) {
        super(id)
    }
    get type() {
        return NodeType.Body
    }
}

class Paragraph extends Node {
    constructor(id) {
        super(id)
    }
    get type() {
        return NodeType.Paragraph
    }
}

module.exports = {
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