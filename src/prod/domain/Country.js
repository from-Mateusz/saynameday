"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Country {
    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
    get Name() {
        return this.name;
    }
    get Code() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    getCode() {
        return this.code;
    }
    isNull() {
        return false;
    }
}
exports.default = Country;
