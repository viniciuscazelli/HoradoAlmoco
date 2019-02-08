"use strict";
const authController_1 = require("../controller/authController");
const reserveCase_1 = require("../use-cases/reserveCase");
const reserveController_1 = require("../controller/reserveController");
module.exports = function (app, io, sockets) {
    io.on('connection', function (socket) {
        if (authController_1.authController.isAuthenticatedBySession(socket.handshake.session)) {
            sockets.add(socket);
            socket.on("getDatabyDay", (date) => {
                reserveCase_1.reserveCase.getReserve(date.date).then((value) => {
                    socket.emit("databyDay", value.horary);
                });
            });
            socket.on('disconnect', () => {
                sockets.delete(socket);
            });
        }
    });
    app.post('/reserve/save', function (req, res) {
        reserveController_1.reserveController.saveReserve(req, res, function (d) {
            if (d)
                sockets.forEach(element => {
                    element.emit('reserve' + d.day.getUTCFullYear() + "-" + (d.day.getUTCMonth() + 1) + "-" + d.day.getUTCDate(), d.horary);
                });
            res.send();
        });
    });
    app.post('/reserve/cancel', function (req, res) {
        reserveController_1.reserveController.removeReserve(req, res, function (d) {
            if (d)
                sockets.forEach(element => {
                    element.emit('reserve' + d.day.getUTCFullYear() + "-" + (d.day.getUTCMonth() + 1) + "-" + d.day.getUTCDate(), d.horary);
                });
            res.send();
        });
    });
};
