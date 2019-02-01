"use strict";
const messageReturn_1 = require("../models/messageReturn");
var authController;
(function (authController) {
    function isAuthenticated(req, res, sendresponse = false) {
        var m;
        if (req.session.userLogged == undefined || req.session.userLogged == null) {
            m = new messageReturn_1.messageReturn(undefined, "Autorização negada", 401);
            req.session.userLogged = undefined;
        }
        if (req.session.userLogged != undefined && req.session.userLogged != null && sendresponse)
            m = new messageReturn_1.messageReturn(req.session.userLogged, "Autorizado", 200);
        res.statusCode = m.code;
        res.send(JSON.stringify(m));
        return req.session.userLogged != undefined && req.session.userLogged != null;
    }
    authController.isAuthenticated = isAuthenticated;
    function setAuth(req, user) {
        // console.log(req.session);
        req.session.userLogged = user;
    }
    authController.setAuth = setAuth;
    function removeAuth(req, res) {
        var m;
        m = new messageReturn_1.messageReturn(undefined, "Sucesso!", 200);
        req.session.destroy();
        res.send(JSON.stringify(m));
    }
    authController.removeAuth = removeAuth;
})(authController = exports.authController || (exports.authController = {}));
