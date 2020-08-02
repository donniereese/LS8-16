const assert = require('assert')
const Trype = require('../src/modules/Trype.js')

describe('Trype Module -- ', function() {
    describe('CheckTypes', function() {
        let trype;

        beforeEach( function() {
            trype = new Trype();
        });

        describe('Method: isArray', function() {
            it('should exist', function() {
                assert(trype.isArray);
            });

            it('should return -1 when the value is not present', function() {
                assert.equal([1,2,3].indexOf(4), -1);
            });
        });

        describe('Method: is', function() {
            it('should exist', function() {
                assert(trype.is);
            });
        });
    });
});
