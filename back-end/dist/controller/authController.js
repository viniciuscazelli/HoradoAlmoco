"use strict";
const messageReturn_1 = require("../models/messageReturn");
var authController;
(function (authController) {
    function isAuthenticated(req, res, sendresponse) {
        var m;
        if (req.session == undefined || req.session.userLogged == undefined || req.session.userLogged == null) {
            m = new messageReturn_1.messageReturn(undefined, "Autorização negada", 401);
            req.session.userLogged = undefined;
            res.statusCode = m.code;
            res.send(JSON.stringify(m));
        }
        if (req.session.userLogged != undefined && req.session.userLogged != null && sendresponse) {
            m = new messageReturn_1.messageReturn(req.session.userLogged, "Autorizado", 200);
            res.statusCode = m.code;
            res.send(JSON.stringify(m));
        }
        return req.session.userLogged != undefined && req.session.userLogged != null;
    }
    authController.isAuthenticated = isAuthenticated;
    function isAuthenticatedBySession(session) {
        return session.userLogged != undefined && session.userLogged != null;
    }
    authController.isAuthenticatedBySession = isAuthenticatedBySession;
    function setAuth(req, user) {
        req.session.userLogged = user;
    }
    authController.setAuth = setAuth;
    function getUserAuthenticated(req) {
        return req.session.userLogged;
    }
    authController.getUserAuthenticated = getUserAuthenticated;
    function removeAuth(req, res) {
        var m;
        m = new messageReturn_1.messageReturn(undefined, "Sucesso!", 200);
        req.session.destroy();
        res.send(JSON.stringify(m));
    }
    authController.removeAuth = removeAuth;
})(authController = exports.authController || (exports.authController = {}));
