const { StringTrype } = require('./modules/Trype.js');

class PathObject {
    constructor() {
        this._value = null;
    }

    parseFromString(pathStr) {
        
    }

    set value(v) {
        this._value = v;
    }

    get value() {
        return this._value;
    }
}

class Paths {
    constructor() {
        this.localRoot = null
        this.webRoot = null
        this.paths = {}
    }

    parsePath (type, name) {

    }

    setPath (type, name, filepath) {
        if (!this.paths[type]) return false;
        if (!this.paths[type][name]) return false;
        this.paths[type][name] = {

        }
    }

    setType (type) {
        if (this.paths[type]) return false;
        this.paths[type] = {}
    }

    path () {

    }
}

module.exports = {
    Paths,
    PathObject
}
