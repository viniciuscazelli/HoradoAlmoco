import {} from "mocha";
import { user } from "../models/user";
import { userCase } from "../use-cases/userCase";
import { sha512 } from "js-sha512";
import { messageReturn } from "../models/messageReturn";
import { systemOptionsCase } from "../use-cases/systemOptionsCase";
import { systemOptions } from "../models/systemOptions";
import { utilCase } from "../use-cases/util";

const chai = require("chai");
const assert = chai.assert;

describe('Util operations', () => {
   
    it('test: validation sucess', () => {
        assert.equal(utilCase.textValidate("viniciuscazelli@hotmail.com","[a-zA-Z0-9\_,.@-]"),true)
    })

    it('test: validation fail', () => {
        assert.equal(utilCase.textValidate("viniciuscazelli@%hotmail.com","[a-zA-Z0-9\_,.@-]"),false)
    })


});