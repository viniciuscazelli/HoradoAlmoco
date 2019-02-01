"use strict";
const BaseRepository_1 = require("./BaseRepository");
class SystemOptionsRepository extends BaseRepository_1.BaseRepository {
    getfirstConfig() {
        return new Promise((resolve) => {
            this._collection.find({}).toArray().then((value) => {
                if (value && value.length > 0)
                    resolve(value[0]);
                resolve(undefined);
            });
        });
    }
}
exports.SystemOptionsRepository = SystemOptionsRepository;
