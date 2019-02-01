"use strict";
const userController_1 = require("../controller/userController");
const authController_1 = require("../controller/authController");
module.exports = function (app) {
    app.post('/user/new', function (req, res) {
        userController_1.userController.saveUser(req, res);
    });
    app.post('/user/auth', function (req, res) {
        userController_1.userController.authUser(req, res);
    });
    app.get('/user/logout', function (req, res) {
        userController_1.userController.logout(req, res);
    });
    app.get('/user/isAuthenticated', function (req, res) {
        authController_1.authController.isAuthenticated(req, res, true);
    });
};
