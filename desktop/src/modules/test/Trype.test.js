const Jasmine = require('jasmine')
const jasmine = new Jasmine()

describe("A suite", () => {
    it('contains spec with an expectation', () => {
        expect(true).toBe(true);
    })
})
