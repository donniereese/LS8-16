# LS8

An 8 bit CPU and system emulator.

## About

The goal of the LS8 is to simulate, with a relative accuracy, the components, operation and
experience of an 8-bit micro-style computer. It started as a basic CPU emulator for a project
at Lambda School. The goal is to slowly expand the emulator to immiate more accurately the
differnet aspects of the CPU, Memory, Storage and I/O devices.

## Goals

The CPU is a complicated thing and has many differnet implementations wit different use cases.
The main goal is to reproduce the workings of a CPU with my current level of knowledge and
slowly itterate the complexity as I learn more, not to completely replicate any specific
architexture or any speific device or experience.

That said, I want to try and implement it without taking too many shortcuts. The emulator needs
to not only replicate the workins of the CPU, but how the CPU interacts with the BUS and other
peripherals. The Memory needs to interact with the BUS instead of speaking directly to the CPU.
The Storage device needs to interact with the BUS and replicate the relative speeds and workings.
A big goal will be some sort of device output designed to work with the system and not just
calling console.log. Keyboard input is partially implemented but also needs to interact with the
BUS.

## Independent, Asynchronous Parts
The CPU, Memory, Bus, ect should all be asynchronous; meaning the memory should be able to run
slower and separately from the faster CPU cycl

## Checklist
* CPU, Memory, Bus, Devices should all have their own clocks that run asynchronously.

## Components

### CPU
    * Register
    * ALU
    *
#### Registers

### Bus
    Each bus seems to need a clock that runs at twice the frequency of the main clock. This is to
    allow for both a read and write time that is syncronous to the main clock, which controls
    the instruction timing for each of the other components. The idea goes that it can write to
    the bus on the first and read the results from the bus near the latter half of it. This would
    mean that the main clock would somehow have to be in some syncronization with the bus clocks.
    Two ways come to mind:
    1. The main clock sends a single signal at the instantiation to the relying clocks so that
       they can start at roughly the same time and be in sync well enough but independently.
    2. The main clock sends a signal at the beginning of each tick and the bus clocks measure
       two ticks for each tick.

    There can be many different buses, each with their own width, if needed. The main idea, though,
    is that there is at least one data bus, instruction bus and address bus.
    **Data Bus:**
       The data that is being written to another component or read from another component.
    **Address Bus:**
       The address of the value either being written to or read from. This could be memory, storage
       or some sort of instruction location.
    **Instruction Bus:**
       This would be the control bus. There could be any number, but one could be used to pass
       instructions to and from the CPU. The cpu could issue instructions on one control bus and
       have another control bus that determines which device is receiving it. It seems to be an
       architecture issue.

### Memory
