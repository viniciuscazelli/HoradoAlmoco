"use strict";
module.exports = function (app) {
    app.post('/user/new', function (req, res) {
        var u = req.body;
    });
};
