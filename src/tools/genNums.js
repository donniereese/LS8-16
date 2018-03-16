let x = 8;
let bw = 3;
let hw = 2;

if (process.argv.length > 2) {
    x = parseInt(process.argv[2]);
    bw = (x - 1).toString(2).length;
    hw = (x - 1).toString(16).length;
}
    
if (isNaN(x)) {
    console.log(`"${process.argv[2]} is not a number!"`);
    process.exit();
}

for (i = 0; i < x; i++) {
    let s = `| ${i.toString().padStart(x.toString().length, '0')} | ${i.toString(2).padStart(bw, '0')} | 0x${i.toString(16).padStart(hw, '0')} |`;

    console.log(s);
}