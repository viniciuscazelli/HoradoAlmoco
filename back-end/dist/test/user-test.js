"use strict";
const user_1 = require("../models/user");
const userCase_1 = require("../use-cases/userCase");
const js_sha512_1 = require("js-sha512");
const chai = require("chai");
const assert = chai.assert;
describe('User operations', () => {
    // it('test: create new user', (done) => {
    //     var userSubmit : user = new user("SKA","ska@ska.com.br","ska@6654");
    //     userController.saveUser(userSubmit, function(r) {
    //         assert.equal(r.message, "Sucesso!!!");
    //         assert.equal(r.res.name, userSubmit.name);
    //         assert.equal(r.res.email, userSubmit.email);
    //         assert.equal(r.res.password, sha512(userSubmit.password));
    //         done();
    //     }) 
    // });
    it('test: auth user sucess', () => {
        let userSubmit = new user_1.user("SKA", undefined, "ska@6654");
        userCase_1.userCase.authUser(userSubmit).then((value) => {
            assert.equal(value.message, "Sucesso!!!");
            assert.equal(value.code, 401);
            assert.equal(value.res.name, userSubmit.name);
            assert.equal(value.res.email, userSubmit.email);
            assert.equal(value.res.password, js_sha512_1.sha512(userSubmit.password));
        });
    });
    it('test: auth user fail', () => {
        let userSubmit = new user_1.user("SKA", undefined, "1234");
        userCase_1.userCase.authUser(userSubmit).then((value) => {
            assert.equal(value.code, 401);
            assert.equal(value.message, "Usuario e/ou senha incorreto(s)!");
            assert.isNotOk(value.res);
        });
    });
});
