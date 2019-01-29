"use strict";
class BaseRepository {
    constructor(db, collectionName) {
        this._collection = db.collection(collectionName);
    }
    create(item) {
        throw new Error("Method not implemented.");
    }
    update(id, item) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
    find(item) {
        throw new Error("Method not implemented.");
    }
    findOne(id) {
        throw new Error("Method not implemented.");
    }
}
exports.BaseRepository = BaseRepository;
