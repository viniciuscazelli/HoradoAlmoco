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
const user_1 = require("../db/user");
const js_sha512_1 = require("js-sha512");
var userController;
(function (userController) {
    function saveUser(user, callback) {
        (() => __awaiter(this, void 0, void 0, function* () {
            const connection = yield mongodb_1.MongoClient.connect('mongodb://localhost');
            const db = connection.db('horadoalmoco');
            var userRepository = new user_1.UserRepository(db, "user");
            userRepository.findUserByEmail(user.email).then((result) => {
                console.log(JSON.stringify(result));
                if (true) {
                    var r = new messageReturn_1.messageReturn(undefined, "Erro! Usuário já cadastrado." + JSON.stringify(result));
                    callback(r);
                }
                else {
                    user.password = js_sha512_1.sha512(user.password);
                    userRepository.create(user).then((result) => {
                        var r = new messageReturn_1.messageReturn(result ? user : undefined, result ? "Sucesso!!!" : "Erro ao salvar usuario");
                        callback(r);
                    }, (result) => {
                    }).catch((err) => {
                        var r = new messageReturn_1.messageReturn(undefined, JSON.stringify(err));
                        callback(r);
                    });
                }
            }, (err) => {
                var r = new messageReturn_1.messageReturn(undefined, "Erro! Usuário já cadastrado." + JSON.stringify(err));
                callback(r);
            }).catch((err) => {
                var r = new messageReturn_1.messageReturn(undefined, "Erro! Usuário já cadastrado." + JSON.stringify(err));
                callback(r);
            });
        }))();
    }
    userController.saveUser = saveUser;
    function authUser(user, callback) {
        var r = new messageReturn_1.messageReturn(user, "Sucesso!!!");
        callback(r);
    }
    userController.authUser = authUser;
})(userController = exports.userController || (exports.userController = {}));
