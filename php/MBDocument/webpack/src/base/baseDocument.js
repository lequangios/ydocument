import MBChapter from '../mbChapter'

class MB {
    static name() {
        console.log('yes ready')
    }

    mapWithJson(json) {
        for (const [key, value] of Object.entries(this)) {
            if (json[key] != undefined) {
                const type = this.objectType(value)
                this.mapValue(key, type, json[key])
            }
        }
    }

    objectType(value) {
        if (Array.isArray(value)) {
            return "array"
        }
        return typeof value
    }

    arrayItemType(value) {
        if (value.length == 0) {
            return 'object'
        } else {
            return this.objectCustomType(value[0])
        }
    }

    objectCustomType(value) {
        const type = typeof value
        if (type == "object") {
            return value.constructor.name.toLowerCase()
        }
        return type
    }

    mapValue(key, type, value) {
        if (type == "object") {
            this.mapObject(key, value)
        } else if (type == "boolean") {
            this.mapBool(key, value)
        } else if (type == "number") {
            this.mapNumber(key, value)
        } else if (type == "string") {
            this.mapString(key, value);
        } else if (type == "object") {
            this.mapObject(key, value)
        } else if (type == "array") {
            if (Array.isArray(value) && value.length > 0) {
                this.mapArray(key, value)
            }
        }
    }

    mapBool(key, value) {
        this[key] = Boolean(value)
    }

    mapString(key, value) {
        this[key] = String(value)
    }

    mapNumber(key, value) {
        this[key] = Number(value)
    }

    mapArray(key, value) {
        const type = this.arrayItemType(this[key])
        if (type == 'mbchapter') {
            this[key] = this.arrayChapter(value)
        } else {
            this[key] = value
        }
    }

    mapObject(key, value) {
        if (this[key].hasOwnProperty('mapWithJson')) {
            this[key].mapWithJson(value)
        } else {
            this[key] = value
        }
    }

    arrayChapter(value) {
        let data = []
        for (const item of value) {
            const chapter = new MBChapter()
            chapter.mapWithJson(item)
            data.push(chapter)
        }
        return data
    }
}

export default MB