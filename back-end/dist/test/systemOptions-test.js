"use strict";
const systemOptionsCase_1 = require("../use-cases/systemOptionsCase");
const systemOptions_1 = require("../models/systemOptions");
const chai = require("chai");
const assert = chai.assert;
describe('System options operations', () => {
    it('test: get system option', () => {
        systemOptionsCase_1.systemOptionsCase.getSystemOptions().then(value => {
            assert.equal(value.message, "Sucesso!");
            assert.equal(value.code, 200);
            assert.exists(value.res);
            assert.exists(value.res.activeSignup);
            assert.exists(value.res.prefix);
        });
    });
    it('test: prefix undefined', () => {
        var saveSystemOptions = new systemOptions_1.systemOptions(undefined, false);
        systemOptionsCase_1.systemOptionsCase.saveSystemOptions(saveSystemOptions).then(value => {
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.equal(value.code, 400);
            assert.notExists(value.res);
        });
    });
    it('test: activeSignup undefined', () => {
        var saveSystemOptions = new systemOptions_1.systemOptions("", undefined);
        systemOptionsCase_1.systemOptionsCase.saveSystemOptions(saveSystemOptions).then(value => {
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.equal(value.code, 400);
            assert.notExists(value.res);
        });
    });
    it('test: prefix > 200', () => {
        var saveSystemOptions = new systemOptions_1.systemOptions("@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", true);
        systemOptionsCase_1.systemOptionsCase.saveSystemOptions(saveSystemOptions).then(value => {
            assert.equal(value.message, "Tamanho incorreto do campo prefixo digite um prefixo com tamanho de até 200 caracteres!");
            assert.equal(value.code, 400);
            assert.notExists(value.res);
        });
    });
});
