const chunk = (instArr = []) => {
    // chunk into 3 sections, program, global, body
  const sections = {
    program:{
      startIndex: -1,
      inst: []
    },
    global: {
      startIndex: -1,
      inst: []
    },
    body: [],
  }

  let section = null;
  let line;

  for (let i = 0; i < instArr.length; i++) {
    line = i;
    const line = instArr[i]
    if (line[0] !== ':') {
      if (!section) throw new Error('Section not chosen before section contents');


      continue;
    }

    section = line.substring(1);
  }

  return {}
}

module.exports = chunk;