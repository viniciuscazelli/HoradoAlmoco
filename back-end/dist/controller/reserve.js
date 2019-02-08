"use strict";
const userCase_1 = require("../use-cases/userCase");
const messageReturn_1 = require("../models/messageReturn");
const authController_1 = require("./authController");
const systemOptionsCase_1 = require("../use-cases/systemOptionsCase");
var userController;
(function (userController) {
    function saveUser(req, res) {
        let u = req.body;
        systemOptionsCase_1.systemOptionsCase.getSystemOptions().then(r => {
            var systemOptions = r.res;
            if (systemOptions.activeSignup && u.name.endsWith(systemOptions.prefix)) {
                userCase_1.userCase.saveUser(u).then((value) => {
                    if (value.code == 200)
                        this.authUser(req, res);
                    else {
                        res.setHeader('Content-Type', 'application/json');
                        res.statusCode = value.code;
                        res.send(JSON.stringify(value));
                    }
                });
            }
            else {
                var r = new messageReturn_1.messageReturn(null, "Não foi possivel realizar o cadastro", 400);
                res.statusCode = r.code;
                res.send(JSON.stringify(r));
            }
        });
    }
    userController.saveUser = saveUser;
    function authUser(req, res) {
        let u = req.body;
        console.log(u);
        userCase_1.userCase.authUser(u).then((value) => {
            if (value.code == 200) {
                authController_1.authController.setAuth(req, value.res);
            }
            else {
                authController_1.authController.setAuth(req, undefined);
            }
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = value.code;
            res.send(JSON.stringify(value));
        });
    }
    userController.authUser = authUser;
    function logout(req, res) {
        authController_1.authController.removeAuth(req, res);
    }
    userController.logout = logout;
})(userController = exports.userController || (exports.userController = {}));
