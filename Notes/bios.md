# BIOS Parts
 1. Basic sections of memory
 2. Understanding of Registers
 3. Basic R/W Functions For FS
 4. Ability to mass load/release memory
 5. Ability To Load Drivers On Load
 6. Can take instructions on boot without instructions
 7. Can autoload instructions on boot with instructions
 8. Can be called by instructions

## 1. Basic Sections of Memory

### 1.1 Memory Map
|    LABEL    | ADDR |             DESCRIPTION             |
|-------------|------|-------------------------------------|
| CONFIG      |      |                                     |
| INPT_SWITCH | 0x00 | Enable Input Port?                  |
| DISP_SWITCH | 0x01 | Enable Display Port?                |
| MEM_SIZE    | 0x02 | Size of available memory            |
| PROG_LOCATE | 0x03 | Location of user program            |
|             |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |
|             |      |  |
| STACK_HEAD  |  &   |                                     |

| SYMBOL |                   DESCRIPTION                   |
|--------|-------------------------------------------------|
|   ^    | Beginning of memory                             |
|   $    | End of memory                                   |
|   #0   | Bank notation number                            |

## 2. Understanding of Registers

## 3. Basic R/W Functions For FS

## 4. Ability To Load Drivers On Load