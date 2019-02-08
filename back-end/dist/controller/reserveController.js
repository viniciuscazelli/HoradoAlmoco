"use strict";
const authController_1 = require("./authController");
const reserveCase_1 = require("../use-cases/reserveCase");
var reserveController;
(function (reserveController) {
    function removeReserve(req, res, callback) {
        if (authController_1.authController.isAuthenticated(req, res, false)) {
            var d = req.body;
            var u = req.session.userLogged;
            reserveCase_1.reserveCase.removeReserve(d, u).then(value => {
                callback(value);
            });
        }
    }
    reserveController.removeReserve = removeReserve;
    function saveReserve(req, res, callback) {
        if (authController_1.authController.isAuthenticated(req, res, false)) {
            var d = req.body;
            var u = req.session.userLogged;
            reserveCase_1.reserveCase.saveReserve(d, u).then(v => {
                callback(v);
            });
        }
    }
    reserveController.saveReserve = saveReserve;
})(reserveController = exports.reserveController || (exports.reserveController = {}));
