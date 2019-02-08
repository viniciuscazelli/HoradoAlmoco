"use strict";
class Horary {
    constructor(hour, minutes, reservations) {
        this.hour = hour;
        this.minutes = minutes;
        this.reservations = reservations;
    }
}
exports.Horary = Horary;
class Day {
    constructor(day, horary) {
        this.day = day;
        this.horary = horary;
    }
}
exports.Day = Day;
class ReserveDay {
    constructor(day, hour, minutes) {
        this.day = day;
        this.hour = hour;
        this.minutes = minutes;
    }
}
exports.ReserveDay = ReserveDay;
