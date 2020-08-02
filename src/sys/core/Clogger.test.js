const Clogger = require('./Clogger.js');

const c = new Clogger();

c.start()
 .foreground('red').and()
 .background('black').end()
 .text('Hello').out()
 .start().reset().end()
 .clear().text('Welcome').out();
