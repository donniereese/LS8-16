const alphabet = {
'Space': ['00000000',
          '00000000',
          '00000000',
          '00000000',
          '00000000',
          '00000000',
          '00000000',
          '00000000'],
      A: ['00000000',
          '00011000',
          '00100100',
          '01000010',
          '01111110',
          '01000010',
          '01000010',
          '01000010'],
      B: ['00000000',
          '01111100',
          '00100010',
          '00100100',
          '00111000',
          '00100100',
          '00100010',
          '01111100'],
      C: ['00000000',
          '00011100',
          '00100010',
          '01000000',
          '01000000',
          '01000000',
          '00100010',
          '00011100'],
      D: ['00000000',
          '01111000',
          '00100100',
          '00100010',
          '00100010',
          '00100010',
          '00100100',
          '01111000'],
      E: ['00000000',
          '01111110',
          '00100000',
          '00100000',
          '00111000',
          '00100000',
          '00100000',
          '01111110'],
      F: ['00000000',
          '01111110',
          '00100000',
          '00100000',
          '00111000',
          '00100000',
          '00100000',
          '00100000'],
      G: ['00000000',
          '00011000',
          '00100100',
          '01000010',
          '01000000',
          '01000110',
          '00100010',
          '00011110'],
      H: ['00000000',
          '00100010',
          '00100010',
          '00100010',
          '00111110',
          '00100010',
          '00100010',
          '01100010'],
      I: ['00011100',
          '00101010',
          '00100010',
          '01010100',
          '10001010',
          '11000010',
          '10001010',
          '01111100'],
      a: ['00000000',
          '00000000',
          '00000000',
          '00000000',
          '00111010',
          '01000110',
          '01000110',
          '00111010'],
      b: ['00000000',
          '01000000',
          '01000000',
          '01111100',
          '01000010',
          '01000010',
          '01000010',
          '01111100'],
      c: ['00000000',
          '00000000',
          '00000000',
          '00111100',
          '01000010',
          '01000000',
          '01000010',
          '00111100'],
      d: ['00000000',
          '00000010',
          '00000010',
          '00000010',
          '00111010',
          '01000110',
          '01000110',
          '00111010'],
      e: ['00000000',
          '00000000',
          '00000000',
          '00111100',
          '01000010',
          '01111100',
          '01000000',
          '00111100'],
      f: ['00000000',
          '00011100',
          '00100010',
          '01110000',
          '00100000',
          '00100000',
          '00100000',
          '00100000'],
      g: ['00000000',
          '00000000',
          '00000000',
          '00111100',
          '01000010',
          '00111110',
          '00000010',
          '00111100'],
      h: ['00000000',
          '01000000',
          '01000000',
          '01000000',
          '01011100',
          '01100010',
          '01000010',
          '01000010'],
      i: ['00000000',
          '00011000',
          '00000000',
          '00001000',
          '00001000',
          '00001000',
          '00001000',
          '00011000'],
      j: ['00000000',
          '00000110',
          '00000000',
          '00000100',
          '00000100',
          '00000100',
          '00100100',
          '00011000'],
      k: ['00000000',
          '00000000',
          '00100100',
          '00101000',
          '00110000',
          '00101000',
          '00100100',
          '00100010'],
      l: ['00000000',
          '00000100',
          '00000100',
          '00000100',
          '00000100',
          '00000100',
          '00000100',
          '00001100'],
      m: ['00000000',
          '00000000',
          '00000000',
          '01110110',
          '01101010',
          '01001010',
          '01000010',
          '01000010'],
      n: ['00000000',
          '00000000',
          '00000000',
          '00101100',
          '00110010',
          '00100010',
          '00100010',
          '00100010'],
      o: ['00000000',
          '00000000',
          '00000000',
          '00111100',
          '01000010',
          '01000010',
          '01000010',
          '00111100'],
      p: ['00000000',
          '00000000',
          '00000000',
          '00111100',
          '00100010',
          '00111110',
          '00100000',
          '00100000'],
      q: ['00000000',
          '00000000',
          '00000000',
          '00011100',
          '00100100',
          '00111100',
          '00000100',
          '00000110'],
      r: ['00000000',
          '00000000',
          '00000000',
          '00101100',
          '00110010',
          '00100000',
          '00100000',
          '00100000'],
      s: ['00000000',
          '00000000',
          '00011000',
          '00100000',
          '00011000',
          '00000100',
          '00000100',
          '00111000'],
      t: ['00000000',
          '00000000',
          '00000000',
          '00010000',
          '00111100',
          '00010000',
          '00010000',
          '00011100'],
      u: ['00000000',
          '00000000',
          '00000000',
          '01000100',
          '01000100',
          '01000100',
          '01001100',
          '00111100'],
      v: ['00000000',
          '00000000',
          '00000000',
          '01000110',
          '01000110',
          '00101100',
          '00101100',
          '00011000'],
      w: ['00000000',
          '00000000',
          '00000000',
          '01001001',
          '01001001',
          '01001001',
          '01011111',
          '00110101'],
      x: ['00000000',
          '00000000',
          '00000000',
          '01000010',
          '00100100',
          '00011000',
          '00100100',
          '01000010'],
      y: ['00000000',
          '00000000',
          '00000000',
          '00100010',
          '00100010',
          '00010100',
          '00001000',
          '00110000'],
      z: ['00000000',
          '00000000',
          '00000000',
          '00111100',
          '00001000',
          '00010000',
          '00100000',
          '00111100'],
    '0': ['00111100',
          '01000010',
          '01000110',
          '01001010',
          '01010010',
          '01100010',
          '00111100',
          '00000000'],
    '1': ['00001000',
          '00011000',
          '00001000',
          '00001000',
          '00001000',
          '00001000',
          '00011000',
          '00000000'],
    '2': ['00111100',
          '01000010',
          '00000110',
          '00001100',
          '00011000',
          '00110000',
          '01111110',
          '00000000'],
    '3': ['00111100',
          '01000010',
          '00000010',
          '00011100',
          '00000010',
          '01000010',
          '00111100',
          '00000000'],
    '4': ['00000100',
          '00001100',
          '00010100',
          '00111110',
          '00000100',
          '00000100',
          '00000100',
          '00000000'],
    '5': ['01111110',
          '01000000',
          '01111100',
          '00000010',
          '00000010',
          '01000010',
          '00111100',
          '00000000'],
    '6': ['00111100',
          '01000010',
          '01000000',
          '01111100',
          '01000010',
          '01000010',
          '00111100',
          '00000000'],
    '7': ['01111110',
          '00001100',
          '00010000',
          '00100000',
          '00100000',
          '00100000',
          '00100000',
          '00000000'],
    '8': ['00111100',
          '01000010',
          '01000010',
          '00100100',
          '01000010',
          '01000010',
          '00111100',
          '00000000'],
    '9': ['00111100',
          '01000010',
          '01000110',
          '00111010',
          '00000010',
          '01000100',
          '00111000',
          '00000000'],
    '.': ['00000000',
          '00000000',
          '00000000',
          '00000000',
          '00000000',
          '00000000',
          '00001000',
          '00011000'],
    '/': ['00000000',
          '00000010',
          '00000110',
          '00001100',
          '00001000',
          '00011000',
          '00110000',
          '01100000'],
'backslash': ['00000000',
          '01000000',
          '01100000',
          '00110000',
          '00010000',
          '00011000',
          '00001100',
          '00000110'],
    ':': ['00000000',
          '00000000',
          '00000000',
          '00001000',
          '00011000',
          '00000000',
          '00001000',
          '00011000'],
    ',': ['00000000',
          '00000000',
          '00000000',
          '00000000',
          '00000000',
          '00011000',
          '00001000',
          '00010000'],
   '\'': ['00000000',
          '00011000',
          '00001000',
          '00010000',
          '00000000',
          '00000000',
          '00000000',
          '00000000'],
    '!': ['00000000',
          '00011000',
          '00011000',
          '00011000',
          '00001000',
          '00000000',
          '00011000',
          '00011000'],
    '>': ['00000000',
          '00000000',
          '01100000',
          '00011000',
          '00000110',
          '00000110',
          '00011000',
          '01100000'],
    '<': ['00000000',
          '00000000',
          '00000110',
          '00011000',
          '01100000',
          '01100000',
          '00011000',
          '00000110'],
    '$': ['00001000',
          '00111110',
          '01001000',
          '00111100',
          '00001010',
          '00001010',
          '01111100',
          '00001000'],
    '@': ['00000000',
          '00111000',
          '01000100',
          '10011101',
          '10100101',
          '10011101',
          '01000010',
          '00111100'],
    '_': ['00000000',
          '00000000',
          '00000000',
          '00000000',
          '00000000',
          '00000000',
          '11111111',
          '11111111'],
'unknown': ['00000000',
          '01111110',
          '01000010',
          '01000010',
          '01000010',
          '01000010',
          '01000010',
          '01111110'],
'spclSquare': ['11111111',
          '11111111',
          '11111111',
          '11111111',
          '11111111',
          '11111111',
          '11111111',
          '11111111'],
'spclHash': ['10101010',
          '01010101',
          '10101010',
          '01010101',
          '10101010',
          '01010101',
          '10101010',
          '01010101'],
'spclHashHalf': ['10001000',
                 '01000100',
                 '00100010',
                 '00010001',
                 '10001000',
                 '01000100',
                 '00100010',
                 '00010001'],
'spclKey': ['00011100',
            '00100010',
            '00100010',
            '00011100',
            '00001000',
            '00011000',
            '00001000',
            '00111000'],
};
