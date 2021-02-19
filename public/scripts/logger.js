"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(name) {
        this.name = name;
    }
    static getInstance(name) {
        return new Logger(name);
    }
    info(msg, ...msgs) {
        console.log(this.createMessagePrefix(), msg, msgs);
    }
    error(msg, ...erroneusValues) {
        console.error(this.createMessagePrefix(), msg, erroneusValues);
    }
    createMessagePrefix() {
        return `Logger ${this.name} speaks at [${new Date()}] about: `;
    }
}
exports.default = Logger;
