"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmptyNameMeaning_1 = __importDefault(require("./EmptyNameMeaning"));
class NameDay {
    constructor(country, date, name, meaning = new EmptyNameMeaning_1.default()) {
        this.country = country;
        this.date = date;
        this.name = name;
        this.meaning = meaning;
    }
    getCountryName() {
        return this.country.getName();
    }
    getCountryCode() {
        return this.country.getCode();
    }
    getName() {
        return this.name;
    }
    getMeaning() {
        return this.meaning;
    }
}
exports.default = NameDay;
