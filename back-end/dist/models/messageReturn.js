"use strict";
class messageReturn {
    constructor(res, message, code = 200) {
        this.res = res;
        this.message = message;
        this.code = code;
    }
}
exports.messageReturn = messageReturn;
