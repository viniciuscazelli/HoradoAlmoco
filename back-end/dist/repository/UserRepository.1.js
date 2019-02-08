"use strict";
const BaseRepository_1 = require("./BaseRepository");
class UserRepository extends BaseRepository_1.BaseRepository {
    countOfUsers() {
        return this._collection.count({});
    }
    findUserByEmail(email) {
        return new Promise((resolve) => {
            this._collection.find({ "email": email }).toArray().then((value) => {
                resolve(value);
            });
        });
    }
    findUserByEmailAndPassword(email, password) {
        return new Promise((resolve) => {
            this._collection.findOne({ email: email, password: password }, (err, result) => {
                if (err) {
                    resolve(undefined);
                    return;
                }
                resolve(result);
            });
        });
    }
    countUserByEmail(email) {
        return this._collection.count({ email: email });
    }
    subscrible(date) {
        this._collection.watch([{ $match: { "date": date } }]);
    }
}
exports.UserRepository = UserRepository;
