"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NameMeaning_1 = __importDefault(require("./NameMeaning"));
class EmptyNameMeaning extends NameMeaning_1.default {
    constructor() {
        super("undefined", "undefined");
    }
    isNull() {
        return true;
    }
}
exports.default = EmptyNameMeaning;
