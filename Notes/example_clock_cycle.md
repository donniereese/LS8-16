# Example CPU Clock Cycle Flow

## CPU Cycle Flow
1. Flags
    a. **FALT**
        The fault flag is set only if the CPU or a component has registered a fault. This causes 
        The system to halt right away and not continue.
    b. **WAIT**
        The system has no current instructions to run and is waiting for input to return from 
        the wait state.
    c. **INST**
        There is currently a mult-part instruction being ran and should skip any further flags 
        until this is unset by the finishing of the instruction. (Skips INTR)
    d. **INTR**
        There is a system interrupt raised and the system should push everything to the stack 
        and handle this before returning to the stack and pulling everything back off.
        1. Push Registers PC,RWS, MDR & MAR
        2. Subtract Interrupt ID from last 
        .. Set the PC
        .. Get Interrupt Vector from Interrupt Address...............
        .. Set MAR to Interrupt Vector
        .. Set PC to Interrupt Address




### Cleanup Stage





## Register Data

    01. Push Register 0
    02. .... Register 1
    03. .... Register 2
    04. .... Register 3
    05. .... Register 4
    06. .... Register 5
    07. .... Register 6
    08. .... Register 7
    09. .... RC (Register Counter)
    10. .... PC (Program Counter)
    11. .... IC (Instruction Counter)
    12. .... RWS (Read/Write Location Switch) (Transition from SRM name)
    13. .... MDR (Memory Data Register)
    14. .... MAR (Memory Address Register)
    15. .... IS 
    16. .... Reserved Register
