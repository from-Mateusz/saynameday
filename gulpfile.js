"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var gulp_1 = __importDefault(require("gulp"));
var gulp_2 = require("gulp");
function copyViews(cb) {
    gulp_1["default"].src("./src/views/**/*")
        .pipe(gulp_1["default"].dest("./build/views"));
    cb();
}
exports["default"] = gulp_2.series(copyViews);
