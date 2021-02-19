"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
class Api {
    getNamedaysByCountryCode(code) {
        jquery_1.default.ajax({
            url: `namedays/${code}`,
            method: "get"
        })
            .done((namedays) => {
            console.log('Namedays: ', namedays);
        })
            .fail(() => {
            console.log('Something went wrong ');
        });
    }
}
exports.default = Api;
