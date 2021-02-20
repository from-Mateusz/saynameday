"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const countryPicker_1 = __importDefault(require("./countryPicker"));
const countryPicker = new countryPicker_1.default();
window.onload = () => {
    countryPicker.enableCountryPicks();
};
