const Screen = require('./devices/screen');

class DISPLAY {
    constructor() {
        this.display: new Screen();
        this.buffer = [];
    }
    
    hook() {
    }
}

module.exports = DISPLAY;