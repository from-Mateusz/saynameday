"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var gulp_1 = __importDefault(require("gulp"));
var gulp_2 = require("gulp");
var gulp_concat_1 = __importDefault(require("gulp-concat"));
function copyViews(cb) {
    gulp_1["default"].src(["./src/views/images", "./src/views/styles"])
        .pipe(gulp_1["default"].dest("./build/views"));
    cb();
}
function buildClientSideScripts(cb) {
    gulp_1["default"].src(["./src/views/scripts/extensions.js", "./src/views/scripts/logger.js", "./src/views/scripts/utils.js", "./src/views/scripts/saynameday.js"])
        .pipe(gulp_concat_1["default"]("snd.js"))
        .pipe(gulp_1["default"].dest("./build/views/scripts/"));
    cb();
}
exports["default"] = gulp_2.series(copyViews, buildClientSideScripts);
