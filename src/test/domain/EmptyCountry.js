"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Country_1 = __importDefault(require("./Country"));
class EmptyCountry extends Country_1.default {
    constructor() {
        super("undefined", "undefined");
    }
    isNull() {
        return true;
    }
}
exports.default = EmptyCountry;
