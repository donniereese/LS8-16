const TokenData = {
    value;
    id;
    line;
    column;
    length;
}

const TokenObject {
	...TokenData,
	lexer: null,
	setValue(newValue= "", update = true) {
		this.value = newValue;
		this.length = newValue.length;
		if (update) this.lexer.update();
		return this;
	},
	moveTo(line, column, update = true) {
		line && (this.line = line);
		column && (this.column = column);
		if (update) this.lexer.update();

		return this;
	},
	moveBy(line, column, update = true) {
		line && (this.line += line);
		column && (this.column += column);
		if (update) this.lexer.update();

		return this;
	},
	set(params = {}, update = true) {
		this.value = params.value || this.value;
		this.id = params.id || this.id;
		this.line = params.line || this.line;
		this.column = params.column || this.column;
		this.length = params.length || this.length;
		if (update) this.lexer.update();

		return this;
	},
	remove() {
		this.value = undefined;
		this.id = undefined;
		this.line = undefined;
		this.column = undefined;
		this.length = undefined;
		this.lexer.update();
	},
}

function TokenGenerator(params, ctx) {
	const temp = Object.create(TokenObject);
	temp.lexer = ctx;
	this.set(params, false)

	return temp;
};

module.exports = { 
	Token: TokenGenerator,
	TokenObject,
}



