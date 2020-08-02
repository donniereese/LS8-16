
let Trype = (function() {
    instance = null;

    class Trype {
        constructor() {
            if (!instance) instance = this;
            this._type = 'object';
            this._data;
            this.check = new CheckTypes();

            return instance;
        }

        get value() {

        }

        set value(v) {
          this._data = v;

        }
    }
})()


class CheckTypes {
    constructor(idents) {
        this._data = (this.isArray(idents)) ? idents : [idents];
        this._types = [];
        this._status;
        this._error = false;
    }

    check(v) {

    }

    isArray(v) {
        return Array.isArray(v);
    }

    isExists(v) {
        if (v === null) return false;
        if (v === undefined) return false;
        return true;
    }

    is(checker, ...types) {
        this._types = types;
        if (this._data.length === 0) return false;
        if (this._types.length === 0) return this._data.reduce((bool, val) => bool ? this.isExists(val) : false, true);
        return this._data.reduce((bool, val) => bool ? types.includes(typeof val) : false, true);
    }

    orThrow(checker, ...errors) {

    }

    orThrowTypeError(checker, error) {

    }
}

class StringTrype extends Trype {

}

class ObjectTrype extends Trype {

}

class ArrayTrype extends Trype {

}

class NumberTrype extends Trype {

}

class FloatTrype extends Trype {

}

const T = function () {

}

module.exports = {
    Trype,
    StringTrype, ObjectTrype, ArrayTrype, NumberTrype, FloatTrype
}
