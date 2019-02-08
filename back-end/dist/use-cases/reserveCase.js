"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
const reserveRepository_1 = require("../repository/reserveRepository");
const Day_1 = require("../models/Day");
var reserveCase;
(function (reserveCase) {
    function getReserve(date) {
        return new Promise((resolve) => {
            (() => __awaiter(this, void 0, void 0, function* () {
                const connection = yield mongodb_1.MongoClient.connect(config_1.config.url, { useNewUrlParser: true });
                const db = connection.db(config_1.config.database);
                var reserveRepository = new reserveRepository_1.ReserveRepository(db, "reserve");
                date = new Date(date);
                reserveRepository.findAggregateUser({ "day": {
                        '$gte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate()),
                        '$lte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + (date.getUTCDate() + 1)) } }).then((value) => {
                    var r = reserveCase.getDefaultDay(date);
                    if (value && value.length > 0) {
                        value[0].horary.forEach(element => {
                            for (var i = 0; i < r.horary.length; i++) {
                                if (r.horary[i].hour == element.hour &&
                                    r.horary[i].minutes == element.minutes) {
                                    r.horary[i].reservations = element.reservations;
                                }
                            }
                        });
                    }
                    resolve(r);
                }, () => resolve(reserveCase.getDefaultDay(date))).catch(() => {
                    resolve(reserveCase.getDefaultDay(date));
                });
            }))();
        });
    }
    reserveCase.getReserve = getReserve;
    function removeReserve(d, u) {
        return new Promise((resolve) => {
            (() => __awaiter(this, void 0, void 0, function* () {
                const connection = yield mongodb_1.MongoClient.connect(config_1.config.url, { useNewUrlParser: true });
                const db = connection.db(config_1.config.database);
                var reserveRepository = new reserveRepository_1.ReserveRepository(db, "reserve");
                var date = new Date(d.day);
                reserveRepository.removeReserve(d, u).then(value => {
                    if (value)
                        getReserve(d.day).then(v => {
                            resolve(v);
                        });
                });
            }))();
        });
    }
    reserveCase.removeReserve = removeReserve;
    function saveReserve(d, u) {
        return new Promise((resolve) => {
            (() => __awaiter(this, void 0, void 0, function* () {
                const connection = yield mongodb_1.MongoClient.connect(config_1.config.url, { useNewUrlParser: true });
                const db = connection.db(config_1.config.database);
                var reserveRepository = new reserveRepository_1.ReserveRepository(db, "reserve");
                var date = new Date(d.day);
                var dateNow = new Date();
                if (new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate()) <
                    new Date(dateNow.getUTCFullYear() + "-" + (dateNow.getUTCMonth() + 1) + "-" + dateNow.getUTCDate())) {
                    resolve(null);
                    return;
                }
                this.SaveRecursive = function () {
                    reserveRepository.findAggregateUser({ "day": {
                            '$gte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate()),
                            '$lte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + (date.getUTCDate() + 1)) } }).then((value) => {
                        if (!checkUserReservedInDay(value, u)) {
                            if (!value || value.length == 0) {
                                reserveRepository.addDayReservation(d).then(res => {
                                    this.SaveRecursive();
                                });
                            }
                            else {
                                var r = reserveCase.getDefaultDay(date);
                                var b = false;
                                value[0].horary.forEach(element => {
                                    if (d.hour == element.hour &&
                                        d.minutes == element.minutes) {
                                        b = true;
                                    }
                                });
                                if (b) {
                                    reserveRepository.addreserve(d, u).then(value => {
                                        getReserve(d.day).then(v => {
                                            resolve(v);
                                        });
                                    });
                                }
                                else {
                                    reserveRepository.addHoraryReservation(d).then(res => {
                                        this.SaveRecursive();
                                    });
                                }
                            }
                        }
                        else {
                            resolve(undefined);
                        }
                    });
                };
                this.SaveRecursive();
            }))();
        });
    }
    reserveCase.saveReserve = saveReserve;
    function checkUserReservedInDay(day, u) {
        var response = false;
        if (day && day.length > 0) {
            day[0].horary.forEach((horary) => {
                horary.reservations.forEach((reserve) => {
                    if (reserve._id == u._id)
                        response = true;
                });
            });
        }
        return response;
    }
    reserveCase.checkUserReservedInDay = checkUserReservedInDay;
    function getDefaultDay(date) {
        var day = new Day_1.Day(date, []);
        day.horary.push(new Day_1.Horary(11, 0, []));
        day.horary.push(new Day_1.Horary(11, 15, []));
        day.horary.push(new Day_1.Horary(11, 30, []));
        day.horary.push(new Day_1.Horary(11, 45, []));
        day.horary.push(new Day_1.Horary(12, 0, []));
        day.horary.push(new Day_1.Horary(12, 15, []));
        day.horary.push(new Day_1.Horary(12, 30, []));
        day.horary.push(new Day_1.Horary(12, 45, []));
        day.horary.push(new Day_1.Horary(13, 0, []));
        day.horary.push(new Day_1.Horary(13, 15, []));
        day.horary.push(new Day_1.Horary(13, 30, []));
        return day;
    }
    reserveCase.getDefaultDay = getDefaultDay;
})(reserveCase = exports.reserveCase || (exports.reserveCase = {}));
