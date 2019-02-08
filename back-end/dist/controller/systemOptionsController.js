"use strict";
const messageReturn_1 = require("../models/messageReturn");
const authController_1 = require("./authController");
const systemOptionsCase_1 = require("../use-cases/systemOptionsCase");
var systemOptionsController;
(function (systemOptionsController) {
    function saveSystemOptions(req, res) {
        let s = req.body;
        if (authController_1.authController.isAuthenticated(req, res, false)) {
            if (authController_1.authController.getUserAuthenticated(req).name == "admin") {
                systemOptionsCase_1.systemOptionsCase.saveSystemOptions(s).then((value) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = value.code;
                    res.send(JSON.stringify(value));
                });
            }
            else {
                var r = new messageReturn_1.messageReturn(null, "Usuário sem permissão", 403);
                res.statusCode = r.code;
                res.send(JSON.stringify(r));
            }
        }
    }
    systemOptionsController.saveSystemOptions = saveSystemOptions;
    function getSystemOptions(req, res) {
        systemOptionsCase_1.systemOptionsCase.getSystemOptions().then(value => {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = value.code;
            res.send(JSON.stringify(value));
        });
    }
    systemOptionsController.getSystemOptions = getSystemOptions;
})(systemOptionsController = exports.systemOptionsController || (exports.systemOptionsController = {}));
