"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const messageReturn_1 = require("../models/messageReturn");
const mongodb_1 = require("mongodb");
const UserRepository_1 = require("../repository/UserRepository");
const js_sha512_1 = require("js-sha512");
const config_1 = require("../config");
const util_1 = require("./util");
var userCase;
(function (userCase) {
    function saveUser(user) {
        return new Promise((resolve) => {
            (() => __awaiter(this, void 0, void 0, function* () {
                if (!user || !user.email || !user.name || !user.password) {
                    var r = new messageReturn_1.messageReturn(undefined, "Preencha os campos corretamente!", 400);
                    resolve(r);
                    return;
                }
                if (user.name.length < 3 || user.name.length > 200) {
                    var r = new messageReturn_1.messageReturn(undefined, "Tamanho incorreto do campo nome digite um nome com tamanho entre 6 e 200 caracteres", 400);
                    resolve(r);
                    return;
                }
                if (user.email.length < 6 || user.email.length > 200) {
                    var r = new messageReturn_1.messageReturn(undefined, "Tamanho incorretoa do campo email digite um email com tamanho entre 6 e 200 caracteres", 400);
                    resolve(r);
                    return;
                }
                if (user.password.length < 6 || user.password.length > 50) {
                    var r = new messageReturn_1.messageReturn(undefined, "Tamanho incorreto do campo senha digite uma senha com tamanho entre 6 e 50 caracteres", 400);
                    resolve(r);
                    return;
                }
                if (user.name.toUpperCase() == 'ADMIN') {
                    var r = new messageReturn_1.messageReturn(undefined, "Nome indisponível", 400);
                    resolve(r);
                    return;
                }
                if (!util_1.utilCase.textValidate(user.name, "[a-zA-Z0-9 \_,.@-]")) {
                    var r = new messageReturn_1.messageReturn(undefined, "Caracteres invalidos para o nome", 400);
                    resolve(r);
                    return;
                }
                if (!util_1.utilCase.textValidate(user.email, "[a-zA-Z0-9\_,.@-]")) {
                    var r = new messageReturn_1.messageReturn(undefined, "Caracteres invalidos para o email", 400);
                    resolve(r);
                    return;
                }
                const connection = yield mongodb_1.MongoClient.connect(config_1.config.url, { useNewUrlParser: true });
                const db = connection.db(config_1.config.database);
                var userRepository = new UserRepository_1.UserRepository(db, "user");
                userRepository.findUserByEmail(user.email).then((result) => {
                    console.log(JSON.stringify(result));
                    if (result.length > 0) {
                        var r = new messageReturn_1.messageReturn(null, "Erro! Usuário já cadastrado." + JSON.stringify(result), 400);
                        resolve(r);
                    }
                    else {
                        user.password = js_sha512_1.sha512(user.password);
                        userRepository.create(user).then((result) => {
                            var r = new messageReturn_1.messageReturn(result ? user : undefined, result ? "Sucesso!!!" : "Erro ao salvar usuario", result ? 200 : 500);
                            resolve(r);
                        }, (result) => {
                        }).catch((err) => {
                            var r = new messageReturn_1.messageReturn(undefined, JSON.stringify(err));
                            resolve(r);
                        });
                    }
                }, (err) => {
                    var r = new messageReturn_1.messageReturn(undefined, "Erro desconhecido! " + JSON.stringify(err), 500);
                    resolve(r);
                }).catch((err) => {
                    var r = new messageReturn_1.messageReturn(undefined, "Erro desconhecido! " + JSON.stringify(err), 500);
                    resolve(r);
                });
            }))();
        });
    }
    userCase.saveUser = saveUser;
    function authUser(user) {
        return new Promise((resolve) => {
            (() => __awaiter(this, void 0, void 0, function* () {
                if (!user || !user.email || !user.password) {
                    var r = new messageReturn_1.messageReturn(null, "Preencha os campos corretamente!", 400);
                    resolve(r);
                    return;
                }
                const connection = yield mongodb_1.MongoClient.connect(config_1.config.url, { useNewUrlParser: true });
                const db = connection.db(config_1.config.database);
                var userRepository = new UserRepository_1.UserRepository(db, "user");
                userRepository.findUserByEmailAndPassword(user.email, js_sha512_1.sha512(user.password)).then((user) => {
                    var r = new messageReturn_1.messageReturn(user, user && user != null ? "Sucesso!" : "Usuario e/ou senha incorreto(s)!", user && user != null ? 200 : 401);
                    resolve(r);
                });
            }))();
        });
    }
    userCase.authUser = authUser;
})(userCase = exports.userCase || (exports.userCase = {}));
