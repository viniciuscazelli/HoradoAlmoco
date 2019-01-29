"use strict";
const user_1 = require("../models/user");
const user_2 = require("../core/user");
const js_sha512_1 = require("js-sha512");
const chai = require("chai");
const assert = chai.assert;
describe('User operations', () => {
    it('test: create new user', () => {
        var userSubmit = new user_1.user("SKA", "ska@ska.com.br", "ska@6654");
        user_2.userController.saveUser(userSubmit, function (r) {
            assert.equal(r.message, "Sucesso!!!");
            assert.equal(r.res.name, userSubmit.name);
            assert.equal(r.res.email, userSubmit.email);
            assert.equal(r.res.password, js_sha512_1.sha512(userSubmit.password));
        });
    });
    it('test: auth user', () => {
        let userSubmit = new user_1.user("SKA", undefined, "ska@6654");
        user_2.userController.authUser(userSubmit, function (r) {
        });
    });
});
