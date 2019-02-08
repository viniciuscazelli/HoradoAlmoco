import { } from "mocha";
import { user } from "../models/user";
import { chatCase } from "../use-cases/chatCase";
import { Group } from "../models/Chat";

const chai = require("chai");
const assert = chai.assert;

describe('chat operations', () => {

    it('test: get groups contains user ', () => {
        var u: user = new user("", "", "", "");
        chatCase.getGroupsByUser(u).then(value => {
            assert.equal(value.code, 200);
            assert.equal(value.message, "Sucesso!");
            assert.exists(value.res);
            assert.isTrue(value.res.length >= 0);
        })
    })

    it('test: get groups contains user , user undefined ', () => {
        chatCase.getGroupsByUser(undefined).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Usuario não definido!");
            assert.notExists(value.res);
        })
    })

    it('test: get groups contains user, _id undefined ', () => {
        var u: user = new user("", "", "", undefined);
        chatCase.getGroupsByUser(u).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario não possui um id definido!");
            assert.notExists(value.res);
        })
    })

    it('test: create groups name length < 6 ', () => {
        var group : Group = new Group("g",new user("userAdmin","userAdmin@ska.com.br","teste"),[], [])
        chatCase.createGroups(group).then(value => {
            assert.equal(value.code, 200);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres");
            assert.exists(value.res);
        })
    })

    it('test: create groups name length > 200 ', () => {
        var group : Group = new Group("groupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroup",new user("userAdmin","userAdmin@ska.com.br","teste"),[], [])
        chatCase.createGroups(group).then(value => {
            assert.equal(value.code, 200);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres!");
            assert.exists(value.res);
        })
    })

    it('test: create groups users length == 0 ', () => {
        var group : Group = new Group("groups",new user("userAdmin","userAdmin@ska.com.br","teste"),[], [])
        chatCase.createGroups(group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Selecione ao menos um usuario para criar o grupo!");
            assert.exists(value.res);
        })
    })

    it('test: alter group name length < 6', () => {
        var group : Group = new Group("g",new user("userAdmin","userAdmin@ska.com.br","teste"),[], [])
        chatCase.renameGroup(group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres");
            assert.exists(value.res);
        })
    })

    it('test: alter group name length > 200', () => {
        var group : Group = new Group("groupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroupgroup",new user("userAdmin","userAdmin@ska.com.br","teste"),[], [])
        chatCase.renameGroup(group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres");
            assert.exists(value.res);
        })
    })

    
    it('test: remove user group not defined', () => {
        var u: user = new user("usertest", "usertest@ska.com.br", undefined, "8231987489754");
        chatCase.removeUserGroup(u,undefined).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O grupo é invalido!");
            assert.notExists(value.res);
        })
    })

    it('test: remove user _id undefined', () => {
        var group : Group = new Group("groupo",new user("userAdmin","userAdmin@ska.com.br","teste"),[], [])
        var u: user = new user("usertest", "usertest@ska.com.br", undefined, undefined);
        chatCase.removeUserGroup(u,group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario é invalido!");
            assert.notExists(value.res);
        })
    })

    it('test: remove user undefined', () => {
        var group : Group = new Group("groupo",new user("userAdmin","userAdmin@ska.com.br","teste"),[], [])
        chatCase.removeUserGroup(undefined, group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario é invalido!");
            assert.notExists(value.res);
        })
    })

    it('test: add user group not defined', () => {
        var u: user = new user("usertest", "usertest@ska.com.br", undefined, "8231987489754");
        chatCase.addUserInGroup(u,undefined).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O grupo é invalido!");
            assert.notExists(value.res);
        })
    })

    it('test: add user _id undefined', () => {
        var group : Group = new Group("groupo",new user("userAdmin","userAdmin@ska.com.br","teste"),[], [])
        var u: user = new user("usertest", "usertest@ska.com.br", undefined, undefined);
        chatCase.addUserInGroup(u,group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario é invalido!");
            assert.notExists(value.res);
        })
    })

    it('test: add user undefined', () => {
        var group : Group = new Group("groupo",new user("userAdmin","userAdmin@ska.com.br","teste"),[], [])
        chatCase.addUserInGroup(undefined, group).then(value => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "O usuario é invalido!");
            assert.notExists(value.res);
        })
    })
});