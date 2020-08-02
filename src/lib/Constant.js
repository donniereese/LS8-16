class Constant {
  constructor(sets = {}) {
    this.dataSet = sets;
  }

  insert(key, value = true) {
    if (!key) throw new Error('Constant.insert requires key');
    if (this.dataSet[key]) throw new Error(`Constant.insert cannot insert into existing key '${key}'`)
    key = key.toString();

    this.dataSet[key] = value;
  }

  remove(key) {
    if (!key) throw new Error(`Constant.remove requires value for key`);
    
    key = key.toString();

        if (this.dataSet[key]) {
      const temp = this.dataSet[key];
      delete this.dataSet[key];
    } else {
      return false;
    } 
  }

  update(key, value) {
    if (!key) throw new Error('Constant.insert requires key');
    if (this.dataSet[key]) throw new Error(`Constant.insert cannot insert into existing key '${key}'`)

    key = key.toString();

    this.dataSet[key] = value;
    return this.dataSet[key];
  }
}

module.exports = Constant;