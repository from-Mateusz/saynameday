"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(name) {
        this.name = name;
    }
    info(message, ...values) {
        console.log(this.createMessagePrefix(), message, values);
    }
    error(message, value) {
        console.error(this.createMessagePrefix(), message, value);
    }
    createMessagePrefix() {
        const now = new Date();
        const msgPrefix = `Logger [${this.name}] speaks at [${now}] about: `;
        return msgPrefix;
    }
}
exports.default = Logger;
