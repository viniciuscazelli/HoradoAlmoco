import { user } from "../models/user";

module.exports = function (app) { 

    app.post('/user/new', function (req, res) {
        let  u : user = req.body;
    });

};