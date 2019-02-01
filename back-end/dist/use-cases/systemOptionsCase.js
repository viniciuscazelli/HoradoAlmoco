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
const config_1 = require("../config");
const systemOptions_1 = require("../models/systemOptions");
const SystemOptionsRepository_1 = require("../repository/SystemOptionsRepository");
var systemOptionsCase;
(function (systemOptionsCase) {
    function getSystemOptions() {
        return new Promise((resolve) => {
            (() => __awaiter(this, void 0, void 0, function* () {
                const connection = yield mongodb_1.MongoClient.connect(config_1.config.url, { useNewUrlParser: true });
                const db = connection.db(config_1.config.database);
                var systemOptionsRepository = new SystemOptionsRepository_1.SystemOptionsRepository(db, "systemOptions");
                systemOptionsRepository.getfirstConfig().then((value) => {
                    if (value == undefined || value == null || value._id == undefined || value._id == null) {
                        value = new systemOptions_1.systemOptions("", false);
                    }
                    var r = new messageReturn_1.messageReturn(value, "Sucesso!", 200);
                    resolve(r);
                });
            }))();
        });
    }
    systemOptionsCase.getSystemOptions = getSystemOptions;
    function saveSystemOptions(systemOptions) {
        return new Promise((resolve) => {
            (() => __awaiter(this, void 0, void 0, function* () {
                const connection = yield mongodb_1.MongoClient.connect(config_1.config.url, { useNewUrlParser: true });
                const db = connection.db(config_1.config.database);
                var systemOptionsRepository = new SystemOptionsRepository_1.SystemOptionsRepository(db, "systemOptions");
                systemOptionsRepository.getfirstConfig().then((value) => {
                    if (value != undefined && value != null && value._id != undefined && value._id != null) {
                        systemOptions._id = value._id;
                        console.log(systemOptions);
                        systemOptionsRepository.update(systemOptions._id, systemOptions).then(res => {
                            if (res) {
                                var r = new messageReturn_1.messageReturn(systemOptions, "Sucesso!", 200);
                                resolve(r);
                            }
                            else {
                                var r = new messageReturn_1.messageReturn(systemOptions, "Falha ao atualizar as opções do sistema!", 200);
                                resolve(r);
                            }
                        });
                    }
                    else {
                        systemOptionsRepository.create(systemOptions).then((value) => {
                            systemOptions._id = value;
                            var r = new messageReturn_1.messageReturn(systemOptions, "Sucesso!", 200);
                            resolve(r);
                        });
                    }
                });
            }))();
        });
    }
    systemOptionsCase.saveSystemOptions = saveSystemOptions;
})(systemOptionsCase = exports.systemOptionsCase || (exports.systemOptionsCase = {}));
