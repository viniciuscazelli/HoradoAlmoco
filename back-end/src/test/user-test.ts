import {} from "mocha";
import { user } from "../models/user";
import { userCase } from "../use-cases/userCase";
import { sha512 } from "js-sha512";
import { messageReturn } from "../models/messageReturn";

const chai = require("chai");
const assert = chai.assert;

describe('User operations', () => {
   
    it('test: auth user sucess', () => {
        var  userSubmit : user = new user(undefined,"ska@ska.com.br","ska@6654");
        userCase.authUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.message, "Sucesso!");
            assert.equal(value.code, 200);
            assert.exists(value.res)
            assert.exists(value.res.name);
            assert.equal(value.res.email, userSubmit.email);
            assert.equal(value.res.password, sha512(userSubmit.password));
        });
    });

    it('test: auth user fail password incorrect', () => {
        var  userSubmit : user = new user(undefined,"ska@ska.com.br","123456");
        userCase.authUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 401);
            assert.equal(value.message, "Usuario e/ou senha incorreto(s)!");
            assert.isNotOk(value.res);
        });
    });

    it('test: auth user fail email incorrect', () => {
        var  userSubmit : user = new user(undefined,"teste@ska.com.br","ska@6654");
        userCase.authUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 401);
            assert.equal(value.message, "Usuario e/ou senha incorreto(s)!");
            assert.isNotOk(value.res);
        });
    });

    it('test: auth user, all undefined', () => {
        userCase.authUser(undefined).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.isNotOk(value.res);
        });
    });

    it('test: auth user, email undefined', () => {
        var  userSubmit : user = new user(undefined,undefined,"123456");
        userCase.authUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.isNotOk(value.res);
        });
    });

    it('test: auth user, password undefined', () => {
        var  userSubmit : user = new user(undefined,"ska@ska.com.br",undefined);
        userCase.authUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user undefined', () => {
        
        userCase.saveUser(undefined).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.isNotOk(value.res);
        });
    });
    it('test: resgister user, name undefined', () => {
        var  userSubmit : user = new user(undefined,"teste@teste","123456");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.isNotOk(value.res);
        });
    });
    it('test: resgister user, email undefined', () => {
        var  userSubmit : user = new user("teste",undefined,"123456");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user, password undefined', () => {
        var  userSubmit : user = new user("teste","teste@1234",undefined);
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Preencha os campos corretamente!");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user, name length < 3', () => {
        var  userSubmit : user = new user("t","teste@teste","123456");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user, name length > 200', () => {
        var  userSubmit : user = new user("Pedro de Alcântara João Carlos Leopoldo Salvador Bibiano Francisco Xavier de Paula Leocádio Miguel Gabriel Rafael Gonzaga Vinicius José Maria Mariana Bosco Juliano Francisvaldo Paulo Machado Algusto Tevez Cazelli Ferreira Gomes da Silva Junior Neto Carlito","teste@teste","123456");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user, email length < 6', () => {
        var  userSubmit : user = new user("teste","t@t","123456");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo email digite um email com tamanho entre 6 e 200 caracteres");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user, email length > 200', () => {
        var  userSubmit : user = new user("teste","testetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetestetesteteste@teste.com","123456");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo email digite um email com tamanho entre 6 e 200 caracteres");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user, password length < 6', () => {
        var  userSubmit : user = new user("teste","teste@teste.com","1234");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo senha digite uma senha com tamanho entre 6 e 50 caracteres");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user, password length > 50', () => {
        var  userSubmit : user = new user("teste","teste@teste.com","012345678901234567890123456789012345678901234567890123456789");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Tamanho incorreto do campo senha digite uma senha com tamanho entre 6 e 50 caracteres");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user, name contain invalid char', () => {
        var  userSubmit : user = new user("teste#","teste@teste.com","01234567");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Caracteres invalidos para o nome");
            assert.isNotOk(value.res);
        });
    });

    it('test: resgister user, email contain invalid char', () => {
        var  userSubmit : user = new user("teste","test#e@teste.com","01234567");
        userCase.saveUser(userSubmit).then((value :messageReturn<user>) => {
            assert.equal(value.code, 400);
            assert.equal(value.message, "Caracteres invalidos para o email");
            assert.isNotOk(value.res);
        });
    });


 });
