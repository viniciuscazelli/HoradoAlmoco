import {} from "mocha";
import { user } from "../models/user";
import { userCase } from "../use-cases/userCase";
import { sha512 } from "js-sha512";
import { messageReturn } from "../models/messageReturn";
import { systemOptionsCase } from "../use-cases/systemOptionsCase";
import { systemOptions } from "../models/systemOptions";

const chai = require("chai");
const assert = chai.assert;

describe('System options operations', () => {
   
    it('test: get system option', () => {
        systemOptionsCase.getSystemOptions().then(value =>{
            assert.equal(value.message, "Sucesso!");
            assert.equal(value.code, 200);
            assert.exists(value.res);
            assert.exists(value.res.activeSignup);
            assert.exists(value.res.prefix);
        })
    })

    it('test: prefix undefined', () => {
        var saveSystemOptions : systemOptions = new systemOptions(undefined,false)
        systemOptionsCase.saveSystemOptions(saveSystemOptions).then(value =>{
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.equal(value.code, 400);
            assert.notExists(value.res);
        })
    })

    it('test: activeSignup undefined', () => {
        var saveSystemOptions : systemOptions = new systemOptions("",undefined)
        systemOptionsCase.saveSystemOptions(saveSystemOptions).then(value =>{
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.equal(value.code, 400);
            assert.notExists(value.res);
        })
    })

    it('test: prefix > 200', () => {
        var saveSystemOptions : systemOptions = new systemOptions("@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",true)
        systemOptionsCase.saveSystemOptions(saveSystemOptions).then(value =>{
            assert.equal(value.message, "Tamanho incorreto do campo prefixo digite um prefixo com tamanho de até 200 caracteres!");
            assert.equal(value.code, 400);
            assert.notExists(value.res);
        })
    })


});