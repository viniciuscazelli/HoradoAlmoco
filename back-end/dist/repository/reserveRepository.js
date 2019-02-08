"use strict";
const BaseRepository_1 = require("./BaseRepository");
const Day_1 = require("../models/Day");
const bson_1 = require("bson");
class ReserveRepository extends BaseRepository_1.BaseRepository {
    findAggregateUser(query) {
        return this._collection.aggregate([
            {
                '$match': query
            }, {
                '$unwind': {
                    'path': '$horary',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$lookup': {
                    'from': 'user',
                    'localField': 'horary.reservations.user_id',
                    'foreignField': '_id',
                    'as': 'horary.reservations'
                }
            }, {
                '$group': {
                    '_id': '$_id',
                    'day': {
                        '$first': '$day'
                    },
                    'horary': {
                        '$push': '$horary'
                    }
                }
            }
        ]).toArray();
    }
    addreserve(d, u) {
        return new Promise((resolve) => {
            var date = new Date(d.day);
            this._collection.updateOne({ "day": {
                    '$gte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate()),
                    '$lte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + (date.getUTCDate() + 1)) },
                "horary.hour": d.hour,
                "horary.minutes": d.minutes }, { "$push": { "horary.$.reservations": {
                        "user_id": new bson_1.ObjectID(u._id)
                    }
                } }, (err) => {
                resolve(!err);
            });
        });
    }
    removeReserve(d, u) {
        return new Promise((resolve) => {
            var date = new Date(d.day);
            this._collection.updateOne({ "day": {
                    '$gte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate()),
                    '$lte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + (date.getUTCDate() + 1)) },
                "horary.hour": d.hour,
                "horary.minutes": d.minutes }, { "$pull": { "horary.$.reservations": {
                        "user_id": new bson_1.ObjectID(u._id)
                    }
                } }, (err) => {
                resolve(!err);
            });
        });
    }
    addDayReservation(d) {
        return new Promise((resolve) => {
            d.day = new Date(d.day);
            d.day = new Date(d.day.getUTCFullYear() + "-" + (d.day.getUTCMonth() + 1) + "-" + d.day.getUTCDate() + " 10:00");
            this.create(new Day_1.Day(new Date(d.day), [])).then(value => {
                resolve(value != null);
            });
        });
    }
    addHoraryReservation(d) {
        return new Promise((resolve) => {
            var date = new Date(d.day);
            this._collection.updateOne({ "day": {
                    '$gte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate()),
                    '$lte': new Date(date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + (date.getUTCDate() + 1)) }
            }, { "$push": { "horary": {
                        "hour": d.hour,
                        "minutes": d.minutes,
                        "reservations": []
                    }
                } }, (err) => {
                resolve(!err);
            });
        });
    }
}
exports.ReserveRepository = ReserveRepository;
