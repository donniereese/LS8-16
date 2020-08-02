import Lexer from "./lexer";

class TokenData {
  constructor() {
    this.value;
    this.id;
    this.line;
    this.column;
    this.length;
          
  }
}

class Token extends TokenData {
  constructor(params = new TokenData(), ctx = new Lexer.Lexer()) {
    this.lexer = ctx;
    this.set(params, false);
  }
  setValue(newValue, update = true) {}
  moveTo(line, column, update = true) {}
  moveBy(line, column, update = true) {}
  set(params, update = true) {}
  remove() {}
}