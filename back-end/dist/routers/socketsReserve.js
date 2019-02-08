"use strict";
const authController_1 = require("../controller/authController");
module.exports = function (app, io, sockets) {
    io.on('connection', socket => {
        sockets.add(socket);
        socket.on('disconnect', () => sockets.delete(socket));
    });
    app.get('/reserve/save', function (req, res) {
        var i = 0;
        var date = new Date();
        console.log(io.sockets.sockets);
        sockets.forEach(element => {
            element.emit('reserve' + date.getFullYear() + date.getMonth() + date.getDay(), { data: [
                    { hour: 11, minutes: 30 },
                    { hour: 11, minutes: 45 }
                ] });
            console.log("register " + i);
            i++;
        });
        res.send();
    });
    app.get('/reserve/get', function (req, res) {
        if (authController_1.authController.isAuthenticated) {
        }
    });
};
