import { userController } from "../controller/userController";
import { authController } from "../controller/authController";

module.exports = function (app:any) { 

    app.post('/user/new', function (req, res) {
        userController.saveUser(req,res);
    });

    app.post('/user/auth', function (req, res) {
        userController.authUser(req,res);
    });

    app.get('/user/logout', function (req, res) {
        userController.logout(req,res);
    });

    app.get('/user/isAuthenticated', function (req, res) {
        authController.isAuthenticated(req,res,true);
    });
};