"use strict";
const user_1 = require("../models/user");
const chatCase_1 = require("../use-cases/chatCase");
const Chat_1 = require("../models/Chat");
const chai = require("chai");
const assert = chai.assert;
describe('chat operations', () => {
    it('test: get groups contains user ', () => {
        var u = new user_1.user("", "", "", "");
        chatCase_1.chatCase.getGroupsByUser(u).then(value => {
            assert.equal(value.code, 200);
            assert.equal(value.message, "Sucesso!");
            assert.exists(value.res);
            assert.isTrue(value.res.length >= 0);
        });
    });
    it('test: get groups contains user , user undefined ', () => {
        chatCase_1.chatCase.getGroupsByUser(undefined).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Usuario não definido!");
            assert.notExists(value.res);
        });
    });
    it('test: get groups contains user, _id undefined ', () => {
        var u = new user_1.user("", "", "", undefined);
        chatCase_1.chatCase.getGroupsByUser(u).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario não possui um id definido!");
            assert.notExists(value.res);
        });
    });
    it('test: create groups name length < 6 ', () => {
        var group = new Chat_1.Group("g", new user_1.user("userAdmin", "userAdmin@ska.com.br", "teste"), [], []);
        chatCase_1.chatCase.createGroups(group).then(value => {
            assert.equal(value.code, 200);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres");
            assert.exists(value.res);
        });
    });
    it('test: create groups name length > 200 ', () => {
        var group = new Chat_1.Group("groupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroup", new user_1.user("userAdmin", "userAdmin@ska.com.br", "teste"), [], []);
        chatCase_1.chatCase.createGroups(group).then(value => {
            assert.equal(value.code, 200);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres!");
            assert.exists(value.res);
        });
    });
    it('test: create groups users length == 0 ', () => {
        var group = new Chat_1.Group("groups", new user_1.user("userAdmin", "userAdmin@ska.com.br", "teste"), [], []);
        chatCase_1.chatCase.createGroups(group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Selecione ao menos um usuario para criar o grupo!");
            assert.exists(value.res);
        });
    });
    it('test: alter group name length < 6', () => {
        var group = new Chat_1.Group("g", new user_1.user("userAdmin", "userAdmin@ska.com.br", "teste"), [], []);
        chatCase_1.chatCase.renameGroup(group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres");
            assert.exists(value.res);
        });
    });
    it('test: alter group name length > 200', () => {
        var group = new Chat_1.Group("groupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroup", new user_1.user("userAdmin", "userAdmin@ska.com.br", "teste"), [], []);
        chatCase_1.chatCase.renameGroup(group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres");
            assert.exists(value.res);
        });
    });
    it('test: remove user group not defined', () => {
        var u = new user_1.user("usertest", "usertest@ska.com.br", undefined, "8231987489754");
        chatCase_1.chatCase.removeUserGroup(u, undefined).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O grupo é invalido!");
            assert.notExists(value.res);
        });
    });
    it('test: remove user _id undefined', () => {
        var group = new Chat_1.Group("groupo", new user_1.user("userAdmin", "userAdmin@ska.com.br", "teste"), [], []);
        var u = new user_1.user("usertest", "usertest@ska.com.br", undefined, undefined);
        chatCase_1.chatCase.removeUserGroup(u, group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario é invalido!");
            assert.notExists(value.res);
        });
    });
    it('test: remove user undefined', () => {
        var group = new Chat_1.Group("groupo", new user_1.user("userAdmin", "userAdmin@ska.com.br", "teste"), [], []);
        chatCase_1.chatCase.removeUserGroup(undefined, group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario é invalido!");
            assert.notExists(value.res);
        });
    });
    it('test: add user group not defined', () => {
        var u = new user_1.user("usertest", "usertest@ska.com.br", undefined, "8231987489754");
        chatCase_1.chatCase.addUserInGroup(u, undefined).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O grupo é invalido!");
            assert.notExists(value.res);
        });
    });
    it('test: add user _id undefined', () => {
        var group = new Chat_1.Group("groupo", new user_1.user("userAdmin", "userAdmin@ska.com.br", "teste"), [], []);
        var u = new user_1.user("usertest", "usertest@ska.com.br", undefined, undefined);
        chatCase_1.chatCase.addUserInGroup(u, group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario é invalido!");
            assert.notExists(value.res);
        });
    });
    it('test: add user undefined', () => {
        var group = new Chat_1.Group("groupo", new user_1.user("userAdmin", "userAdmin@ska.com.br", "teste"), [], []);
        chatCase_1.chatCase.addUserInGroup(undefined, group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario é invalido!");
            assert.notExists(value.res);
        });
    });
});
