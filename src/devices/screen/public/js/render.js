const rowOutput = document.getElementById('bitmapRow');
const colOutput = document.getElementById('bitmapColumn');
const valOutput = document.getElementById('bitmapValue');
rowOutput.value = 0;

// alphabet definition needed anymore?

const canvasWidth = 480;
const canvasHeight = 320;

const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

const bufferSettings = {};
bufferSettings.row = 0;
bufferSettings.col = 0;

const buffer = [];
for (let i = 0; i < 40; i++) {
    buffer[i] = [];
    for (let x = 0; x < 60; x++) {
        buffer[i][x] = '';
    }
}

let pixel = 0;
let val = 0;
let refreshAmmount = 255;

const everyPixel = () => {
    rowOutput.value = 0;
    // get the context
    const ctxData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    // loop through the pixels
    // first we need to math it up to loop through 'rows'
    // each row is pixel width * 4 wide
    // each row is 8 tall
    let rowCounter = 0;
    let bitmapRowCounter = 0;
    let charCounter = 0;
    let pixelCounter = 0;
    let firstRun = true;
    // loop through the entire pixel data
    for (let i = 0; i < ctxData.data.length; i += 4) {
        if (pixelCounter !== 0 && pixelCounter % 8 === 0) charCounter++;

        let row;
        if (rowCounter >= buffer.length) {
            row = [];
        } else {
            row = buffer[rowCounter];
        }

        ctxData.data[i] = 0;
        ctxData.data[i + 1] = 0;
        ctxData.data[i + 2] = 0;

        if (charCounter < row.length) {
            const bitmap = alphabet[row[charCounter]] || null;
            if (bitmap) {
                // bitmapRowCounter - the row in each bitmap character
                // pixelCounter % 8 - the column of each bitmap character
                const bit = Boolean(parseInt(bitmap[bitmapRowCounter][pixelCounter % 8]));

                // if (charCounter === 0 && rowCounter === 0) console.log(bit, bitmapRowCounter);

                let brightness = 255;
                if (bit) {
                    const alpha = ctxData.data[i];
                    const fade = Math.max(1 + alpha - refreshAmmount, 0);
                    const currentBrightness = fade + refreshAmmount;
                    const pixelBrightness = Math.min(currentBrightness, 255);
                    brightness = pixelBrightness;
                    // brightness = refreshAmmount;
                }
                ctxData.data[i] = bit ? brightness : 0;
                ctxData.data[i + 1] = bit ? brightness : 0;
                ctxData.data[i + 2] = bit ? brightness : 0;
                ctxData.data[i + 3] = 255;
                // increment the char counter
                // if ((pixelCounter + 1) % 8) charCounter++;
            }
        }

        if (pixelCounter % 480 === 0 && pixelCounter != 0) {
            bitmapRowCounter++;
            charCounter = 0;
        }
        if (bitmapRowCounter % 8 === 0 && bitmapRowCounter != 0) {
            rowOutput.value = parseInt(rowOutput.value) + 1;
            bitmapRowCounter = 0;
            rowCounter++;
        }
        // increment the pixel
        pixelCounter++;
    }
    ctx.putImageData(ctxData, 0, 0);
    colOutput.value = bufferSettings.col;
}


keyFlags = {
    ctrl: false,
    shift: false,
    alt: false
};


window.setInterval(everyPixel, 1000 / 12);
everyPixel();

// window.addEventListener('keyup', (e) => {
//     e.preventDefault();
//     switch(e.key) {
//         case 'Control':
//             keyFlags.ctrl = false;
//             break;
//         case 'Alt':
//             keyFlags.alt = false;
//             break;
//         case 'Shift':
//             keyFlags.shift = false;
//             break;
//     }
// });

window.addEventListener('keyup', (e) => {
    e.preventDefault();
    switch(e.key) {
        case 'Control':
            keyFlags.ctrl = false;
            break;
        case 'Alt':
            keyFlags.alt = false;
            break;
        case 'Shift':
            keyFlags.shift = false;
            break;
    }
});

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    // console.log(e);
    let keyyer = '';
    switch(e.key) {
        case 'Control':
            keyFlags.ctrl = true;
            break;
        case 'Alt':
            keyFlags.alt = true;
            break;
        case 'Shift':
            keyFlags.shift = true;
            break;
        case 'Enter':
            if (bufferSettings.row < 39) {
                bufferSettings.row++;
                bufferSettings.col = 0;
            }
            break;
        case 'Backspace':
            if (bufferSettings.col > 0) {
                buffer[bufferSettings.row][bufferSettings.col - 1] = '';
                bufferSettings.col--;
            } else if(bufferSettings.row > 0) {
                // going back up a row
                bufferSettings.row--;
                // set col for traversal backwards
                bufferSettings.col = 59;
                // flag for middle-of-line find
                placed = false;
                // traverse backwards over row
                while (bufferSettings.col > 0 && !placed) {
                    console.log('tick')
                    if (bufferSettings.col === 59) {
                        // Value exists in last col of row
                        if (buffer[bufferSettings.row][bufferSettings.col] !== '') {
                            buffer[bufferSettings.row][bufferSettings.col] = '';
                            placed = true;
                            break;
                        }
                    }
                    if (buffer[bufferSettings.row][bufferSettings.col] !== '') {
                        bufferSettings.col++;
                        placed = true;
                    } else {
                        bufferSettings.col--;
                    }
                }
            }
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'E':
        case 'F':
        case 'G':
        case 'H':
        case 'I':
        case 'a':
            if (keyFlags.ctrl && e.key === 'a') keyyer = 'spclHash';
        case 'b':
        case 'c':
        case 'd':
        case 'e':
        case 'f':
        case 'g':
        case 'h':
        case 'i':
        case 'j':
        case 'k':
        case 'l':
        case 'm':
        case 'n':
        case 'o':
        case 'p':
        case 'q':
            if (keyFlags.ctrl && e.key === 'q') keyyer = 'spclKey';
        case 'r':
        case 's':
        case 't':
        case 'u':
        case 'v':
        case 'w':
        case 'x':
        case 'y':
        case 'z':
            if (keyFlags.shift && !keyFlags.alt && !keyFlags.ctrl) {
                keyyer = e.key.toUpperCase();
            }
        case 'Dead':
            // keyyer = 'spclHash';
        case 'ß':
            // keyyer = 'spclSquare';
        case '.':
        case '/':
        case ':':
        case ',':
        case '\'':
        case '!':
        case '>':
        case '<':
        case '$':
        case '@':
        case '_':
            if (keyyer === '') keyyer = e.key;
            // console.log(keyyer);
            buffer[bufferSettings.row][bufferSettings.col] = keyyer;
            bufferSettings.col++;
            break;
        case ' ':
            buffer[bufferSettings.row][bufferSettings.col] = 'Space';
            bufferSettings.col++;
            break;
        case '\\':
            buffer[bufferSettings.row][bufferSettings.col] = 'backslash';
            bufferSettings.col++;
            break;
        default: {
            buffer[bufferSettings.row][bufferSettings.col] = 'unknown';
            bufferSettings.col++;
        }
    }
});
