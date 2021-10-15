module.exports = {
    checkInput:function (json, data) {
        let missing = []
        let pass = true
        for (const [key, value] of Object.entries(data)) {
            if(!json[key]) {
                missing.push(key)
                pass = false
            }
        }

        return {
            "isPass":pass,
            "missing":missing.join(', ')
        }
    }
}