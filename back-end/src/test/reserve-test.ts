import {} from "mocha";
import { user } from "../models/user";
import { userCase } from "../use-cases/userCase";
import { sha512 } from "js-sha512";
import { messageReturn } from "../models/messageReturn";
import { systemOptionsCase } from "../use-cases/systemOptionsCase";
import { systemOptions } from "../models/systemOptions";
import { utilCase } from "../use-cases/util";
import { reserveCase } from "../use-cases/reserveCase";
import { ReserveDay } from "../models/Day";

const chai = require("chai");
const assert = chai.assert;

describe('Reserve operations', () => {

    it('test: reserve minor date', () => {
        var date = new Date();
        date.setHours(-24);
        var  reserve : ReserveDay = new ReserveDay(date,11,15);
        var u : user = new user("","","")
        reserveCase.saveReserve(reserve,u).then((value) => {
            assert.notExists(value);
        });
    });

});