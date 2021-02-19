"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NameMeaning {
    constructor(name, meaning) {
        this.name = name;
        this.meaning = meaning;
    }
    getName() {
        return this.name;
    }
    getMeaning() {
        return this.meaning;
    }
    isNull() {
        return false;
    }
}
exports.default = NameMeaning;
