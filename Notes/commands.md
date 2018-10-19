# Command Manual
This has the CPU machine code and it's corresponding Assembly.

### Sections
1. Machine Code
2. 
3. 
4. Commands
5. Example Programs


## 4. Commands
| HEX  |   BINARY   | ASSEMBLY |         ARGUMENTS         |                 DESCRIPTION                 |
|------|------------|----------|---------------------------|---------------------------------------------|
| 0x01 | 0b00000001 | INIT     |                           |                                             |
| 0x00 | 0b00000000 | HALT     |                           |                                             |
| 0x02 | 0b00000010 | SETR     | NEXT_VAL                  | Set cur. register w/ next mem loc. as reg # |
| 0x6F | 0b01101111 | GETR     |                           | Get reg. val at the next mem. loc. as reg # |
| 0x04 | 0b00000100 | SAVE     |                           |                                     |
| 0x07 | 0b00000111 | LOAD     |                           |                                     |
| 0x0C | 0b00001100 | ADD      |                           |                                     |
| 0x0D | 0b00001101 | SUB      |                           |                                     |
| 0x05 | 0b00000101 | MUL      |                           |                                     |
| 0x0E | 0b00001110 | DIV      |                           |                                     |
| 0x06 | 0b00000110 | PRN      |                           |                                     |
| 0x41 | 0b01000001 | PRA      |                           |                                     |
| 0x   | 0b         | LD       |                           |                                     |
| 0x   | 0b         | ST       |                           |                                     |
| 0x   | 0b         | LDRI     |                           |                                     |
| 0x   | 0b         | STRI     |                           |                                     |
| 0x   | 0b         | STOR     |                           |                                     |
| 0x   | 0b         | LODM     |                           |                                     |
| 0x0A | 0b00001010 | PUSH     |                           |                                     |
| 0x0B | 0b00001011 | POP      |                           |                                     |
| 0x0F | 0b00001111 | CALL     |                           |                                     |
| 0x10 | 0b00010000 | RET      |                           |                                     |
| 0x   | 0b         | PASS     |                           |                                     |
| 0x   | 0b         | JMP      |                           |                                     |
| 0x   | 0b         | JTL      |                           |                                     |
| 0x   | 0b         | JEQ      |                           |                                     |
| 0x   | 0b         | JNE      |                           |                                     |
| 0x   | 0b         | CMP      |                           |                                     |
| 0x   | 0b         | LBL      |                           |                                     |
| 0x   | 0b         | LBJMP    |                           |                                     |
| 0x   | 0b         | LBSET    |                           |                                     |
| 0x   | 0b         | ADR      |                           |                                     |
| 0x   | 0b         | RAD      |                           |                                     |
| 0x   | 0b11011010 | WAD      |                           |                                     |
| 0x   | 0b11011011 | RADR     |                           |                                     |
| 0xC3 | 0b11000011 | CPYR     |                           |                                     |
| 0x20 | 0b00100000 | SETI     |                           |                                     |
| 0x21 | 0b00100001 | GETI     |                           |                                     |
| 0x77 | 0b11101110 | RETI     |                           |                                     |
| 0x7E | 0b01111110 | INPT     | EXT_ADDR                  | Read EXT Input buffer into register |
| 0x7F | 0b01111111 | OTPT     | EXT_ADDR                  | Write register to EXT Output buffer |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |
| 0x   | 0b         |          |                           |                                     |