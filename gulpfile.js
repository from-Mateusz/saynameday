"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var gulp_1 = __importDefault(require("gulp"));
var gulp_2 = require("gulp");
// function minifyStyles(cb: () => void) {
//     gulp.src("./public/styles/style.css")
//         .pipe(minifyCSS({keepBreaks: true}))
//         .pipe(gulp.dest("dist"));
// }
function copyToProduction(cb) {
    gulp_1["default"].src(["./src/test/**/*"])
        .pipe(gulp_1["default"].dest("./src/prod"));
    cb();
}
function copyPublic(cb) {
    gulp_1["default"].src(["./src/dev/public/**/*"])
        .pipe(gulp_1["default"].dest("./public"));
    cb();
}
// gulp.task("browserify", browserifyScripts);
// /* I don't why, but it's not working. It can't find browserify module, but it's installed along with @types */
// function browserifyScripts() {
//     browserify({
//         entries: ["./public/scripts/app.js"],
//         debug: true,
//         paths: ['./node_modules']
//     })
//     .pipeline(source("saynameday.js"))
//     .pipeline(sourcemaps.init({loadMaps: true}))
//     .pipe(sourcemaps.write("./public/scripts"))
//     .pipeline(gulp.dest("./public/scripts"));
// }
// function copyStyles(cb: () => void) {
//     gulp.src(["./src/views/assets/styles/**/*"])
//     .pipe(gulp.dest("./build/src/views/assets/styles"));
//     cb();
// }
// function buildClientSideScripts(cb: () => void) {
//     gulp.src(["./src/views/assets/scripts/extensions.js", "./src/views/assets/scripts/logger.js", "./src/views/assets/scripts/utils.js", "./src/views/assets/scripts/saynameday.js"])
//         .pipe(concat("snd.js"))
//         .pipe(gulp.dest("./build/src/views/assets/scripts"));
//     cb();
// }
exports.assets = copyPublic;
exports["default"] = gulp_2.series(copyToProduction);
