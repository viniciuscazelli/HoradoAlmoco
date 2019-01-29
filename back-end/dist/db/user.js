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
    countUserByEmail(email) {
        return this._collection.count({ email: email });
    }
}
exports.UserRepository = UserRepository;
