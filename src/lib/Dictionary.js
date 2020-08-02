class Struct {
  constructor(struct = {}) {
    this.__struct = struct;
  }

  get data() {
    return this.__struct;
  }

  set data(data = {}) {
    this.__struct = data;
  }
}



objFilter = (obj, method) => {
  const temp = {};
  
  for (let [key, value] of Object.entries(obj)) {
    const bool = method(key, value, obj);
    if (typeof bool === 'boolean' && bool) temp[key] = value;
  }

  return temp;
}



class Dictionary {
  constructor() {
    this.__struct = {};
  }

  insert(key) {}

  remove(key) {}

  update(key, data) {}

  Struct(data = {}) {
    const keys = this.__struct.keys();
    const temp = objFilter(data, (key, value) => this.__Struct[key]);
    const struct = new Struct(temp);
    return struct;
  }


  get struct() {
    return __struct;
  }
  
  set struct(st) {
    if (st !instanceof Struct) st = new Struct(st);
    this.__struct = st;
  }
}

module.exports = Dictionary;