const Clogger = require('./Clogger.js');

const c = new Clogger();

c.start().store().foreground('red').background('black').text('Hello').out();
