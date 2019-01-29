"use strict";
class user {
    constructor(name, email, password, _id = undefined) {
        this.name = name;
        this.email = email;
        this.password = password;
        this._id = _id;
    }
}
exports.user = user;
