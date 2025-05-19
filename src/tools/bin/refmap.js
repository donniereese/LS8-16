const refmap = (insArr = []) => {
    // @# = map reference address
    // $# = reference to mapped address
    const addressSymbols = {}
    const nextInstArr = []

    const addAddressSymbol = (address, symbol) => {
        addressSymbols[symbol] = address
    }

    for (let i = 0; i < insArr.length; i++) {
        const inst = insArr[i];
        let nextInst;

        if (inst[0] === '@') {
            addAddressSymbol(i, inst.slice(1))
        }

        if (inst[0] === '$') {
            const address = addressSymbols[inst.slice(1)]
            if (address === undefined) {
                throw new Error(`Unresolved symbol ${inst}`)
            }
            insArr[i] = address
        }

        if (nextInst) nextInstArr.push(nextInst)
    }
}

module.exports = refmap;
