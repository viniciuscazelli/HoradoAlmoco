import { user } from "../models/user";
import {} from "mocha";
import { userCase } from "../use-cases/userCase";
import { sha512 } from "js-sha512";
import { messageReturn } from "../models/messageReturn";

const chai = require("chai");
const assert = chai.assert;

describe('User operations', () => {
   

    it('test: auth user sucess', () => {

        let  userSubmit : user = new user("SKA",undefined,"ska@6654");
        userCase.authUser(userSubmit).then((value :messageReturn) => {
            assert.equal(value.message, "Sucesso!!!");
            assert.equal(value.code, 401);
            assert.equal(value.res.name, userSubmit.name);
            assert.equal(value.res.email, userSubmit.email);
            assert.equal(value.res.password, sha512(userSubmit.password));
        });
     
    });

    it('test: auth user fail', () => {

        let  userSubmit : user = new user("SKA",undefined,"1234");
        userCase.authUser(userSubmit).then((value :messageReturn) => {
            assert.equal(value.code, 401);
            assert.equal(value.message, "Usuario e/ou senha incorreto(s)!");
            assert.isNotOk(value.res);
        });
     
    });
 });
