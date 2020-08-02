const Token require("./token");

module.exports.GrammarStruct = { //Interface
  id: string;
  match: string;
}

class Lexer {
  consructor() {
    this.index: number = 0;
    this.expr: string = "";
    this.regex?: RegExp;
    this.tokens: Token[] = [];
    this.column: number = 1;
    this.line: number = 1;
    this.data: string = "";
    this.grammar: GrammarStruct[] = [
      {
        id: "newline",
        match: "\\n"
      },
      {
        id: "whitespace",
        match: "\\s"
      }
    ];
  }

  getRegex() {
    if (!this.regex) {
      this.regex = new RegExp(this.expr, "gmu");
      console.log(this.regex);
    }
    this.regex.lastIndex = this.index;
    return this.regex;
  }
  
  loadDefinition(def) {
    if (this.expr.length > 0) this.expr += "|";
      this.expr += `(${def.match})`;
      this.regex = undefined;
      this.grammar.push(def);

      return this;
    }
  }
  
  loadGrammar(grammar = []) {
    for (const def of grammar) {
      this.loadDefinition(def);
    }
    
    return this;
  }
  
  loadData(data = "") {
    this.data += data;
    
    return this;
  }
  
  next() {
    const regex = this.getRegex();
    const match = regex.exec(this.data);
    if (match) {
      const length = match[0].length;
      const token = this.grammar[match.indexOf(match[0], 1) - 1];
      const id = token.id;
      this.index += length;
      this.tokens.push(
        new Token(
          {
            column: this.column,
            line: this.line,
            value: match[0],
            length,
            id
          },
          this
        )
      );
      if (id === "newline") {
        this.column = 1;
        this.line++;
      } else if (id === "whitespace") {
        this.column++;
      } else {
        this.column += length;
      }
  
      return this.tokens[this.tokens.length - 1];
    }
  }
  
  processAll() {
    for (let i = 0; i < Infinity; i++) {
      const token = this.next();
      if (!token) break;
    }
    return this.tokens;
  }
  
  update() {
    this.tokens = this.tokens.filter(token => {
      return token.value && token.value !== "";
    })
    .sort((a, b) => {
      const line = a.line - b.line;
      const column = a.column - b.column;
      return line === 0 ? column : line;
    })
    .map((token, index, tokens) => {
      if (index > 0) {
        const previous = tokens[index - 1];
        if (previous.id === "newline") {
          return token.moveTo(previous.line + 1, 1, false);
        }
        return token.moveTo(
          previous.line,
          previous.column + previous.length,
          false
        );
      } else {
        return token.moveTo(1, 1, false);
      }
    });

    return this;
  }
  
  empty() {
    this.data = "";
    this.line = 1;
    this.column = 1;
    this.index = 0;
    this.tokens = [];

    return this;
  }
}

module.exports.Lexer = Lexer;
