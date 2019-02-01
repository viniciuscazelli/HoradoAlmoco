"use strict";
const systemOptionsController_1 = require("../controller/systemOptionsController");
module.exports = function (app) {
    app.post('/systemOptions/save', function (req, res) {
        systemOptionsController_1.systemOptionsController.saveSystemOptions(req, res);
    });
    app.get('/systemOptions/get', function (req, res) {
        systemOptionsController_1.systemOptionsController.getSystemOptions(req, res);
    });
};
