"use strict";
const util_1 = require("../use-cases/util");
const chai = require("chai");
const assert = chai.assert;
describe('Util operations', () => {
    it('test: validation sucess', () => {
        assert.equal(util_1.utilCase.textValidate("viniciuscazelli@hotmail.com", "[a-zA-Z0-9\_,.@-]"), true);
    });
    it('test: validation fail', () => {
        assert.equal(util_1.utilCase.textValidate("viniciuscazelli@%hotmail.com", "[a-zA-Z0-9\_,.@-]"), false);
    });
});
