"use strict";
class BaseRepository {
    constructor(db, collectionName) {
        this._collection = db.collection(collectionName);
        if (this._collection)
            db.createCollection(collectionName).then((collection) => {
                this._collection = collection;
            });
    }
    create(item) {
        return new Promise((resolve) => {
            this._collection.insertOne(item, (err, docInserted) => {
                let _id = docInserted.insertedId.toHexString();
                resolve(!err ? _id : null);
            });
        });
    }
    update(id, item) {
        return new Promise((resolve) => {
            this._collection.updateOne({ "_id": id }, item, (err) => {
                resolve(!err);
            });
        });
    }
    delete(id) {
        return new Promise((resolve) => {
            this._collection.deleteOne({ "_id": id }, (err) => {
                resolve(!err);
            });
        });
    }
    find(item) {
        return new Promise((resolve) => {
            var collection = [];
            this._collection.find().forEach((doc) => {
                collection.push(doc);
            });
        });
    }
    findOne(id) {
        return new Promise((resolve) => {
            this._collection.findOne({}, (err, result) => {
                if (err)
                    resolve(undefined);
                resolve(result);
            });
        });
    }
}
exports.BaseRepository = BaseRepository;
