"use strict";
const user_1 = require("../models/user");
const reserveCase_1 = require("../use-cases/reserveCase");
const Day_1 = require("../models/Day");
const chai = require("chai");
const assert = chai.assert;
describe('Reserve operations', () => {
    it('test: reserve minor date', () => {
        var date = new Date();
        date.setHours(-24);
        var reserve = new Day_1.ReserveDay(date, 11, 15);
        var u = new user_1.user("", "", "");
        reserveCase_1.reserveCase.saveReserve(reserve, u).then((value) => {
            assert.notExists(value);
        });
    });
});
