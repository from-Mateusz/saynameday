"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NameDay_1 = __importDefault(require("./NameDay"));
const EmptyNameMeaning_1 = __importDefault(require("./EmptyNameMeaning"));
class EmptyNameDay extends NameDay_1.default {
    constructor(country, date) {
        super(country, date, "unknown", new EmptyNameMeaning_1.default());
    }
    isNull() {
        return true;
    }
}
exports.default = EmptyNameDay;
