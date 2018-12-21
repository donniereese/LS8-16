const { performance } = require('perf_hooks');

const array = new Array(1000000);
array.fill(255);
let t1 = performance.now();
let ln = 0;
let lnc = 0;
let tn = 0;
//let i = 0; const iMax = array.length; for(; i < iMax; i++) {
//    tn = Math.floor(performance.now() / 1000);
//    if (tn != ln) {
//        ln = tn;
//        lnc = 0;
//    };
//    lnc++;
//}
let running = true;
while (running) {
    ln++;
    if(ln >= 2000000) running = false;
}
let t2 = performance.now();
console.log(`\n\n\n\nt1:${t1}\nt2:${t2}\nIt took ${t2 - t1} milliseconds.`);
console.log(`\n\n${(t2 - t1) / 1000000}`)