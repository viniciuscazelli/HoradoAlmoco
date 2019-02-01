"use strict";
const userCase_1 = require("../use-cases/userCase");
const authController_1 = require("./authController");
var userController;
(function (userController) {
    function saveUser(req, res) {
        let u = req.body;
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
    userController.saveUser = saveUser;
    function authUser(req, res) {
        let u = req.body;
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
