class Dictionary {
  constructor() {
    this.codes = {};
    this.instructions = {};
  }

  insert(code, instruction, description = '', args = []) {
    this.codes[code] = instruction;
    this.instructions[instruction] = {
      code: code,
      inst: instruction,
      desc: description,
      args: args,
    }
  }

  getByCode(code) {
    const i = this.codes[code];
    if (!i) return undefined;
    return this.getByInstruction(i);
  }

  getByInstruction(inst) {
    const i = this.instructions[inst];
    if (!i) return undefined;
    return this.instructions[i];
  }

  setForCode(values = {}) {
    const { code, inst, desc, args, action, scope } = values;
  }
}

module.exports = Dictionary;
