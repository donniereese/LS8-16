const Clogger = function() {
    this.body = "";

    this.flag = {
        
    };

    this.char = {};

    this.char.begin = '\x1b[';
    this.char.end = 'm';
    this.char.and = ';';
    this.char.reset = '0';
    this.char.storePos = 's';
    this.char.resetPos = 'u';

    this.colors = {
        fg: {
            black: "30",
            red: "31",
            green: "32",
            yellow: "33",
            blue: "34",
            magenta: "35",
            cyan: "36",
            white: "37"
        },
        bg: {
            black: "40",
            red: "41",
            green: "42",
            yellow: "43",
            blue: "44",
            magenta: "45",
            cyan: "46",
            white: "47"
        }
    };
}

Clogger.prototype.start = function() {
    this.body += this.char.begin;
    return this;
}

Clogger.prototype.end = function() {
    this.body += this.char.end;
    return this;
}

Clogger.prototype.and = function() {
    this.body += this.char.and;
    return this;   
}

Clogger.prototype.foreground = function(c) {
    const color = this.colors.fg[c] || this.colors.fg['white'];
    this.body += color;
    return this;
}

Clogger.prototype.background = function(c) {
    const color = this.colors.bg[c] || this.colors.bg['black'];
    this.body += color;
    return this;
}

Clogger.prototype.reset = function() {
    this.body += this.char.reset;
    return this;
}

Clogger.prototype.store = function() {
    this.body += this.char.store;
    return this;
}

Clogger.prototype.text = function(text) {
    this.body += text;
    return this;
}

Clogger.prototype.clear = function() {
    this.body = "";
    return this;
}

Clogger.prototype.out = function() {
    process.stdout.write(this.body);
    return this;
}

module.exports = Clogger;