import gulp from "gulp";
import { series } from "gulp";
import sourcemaps from "gulp-sourcemaps";
import browserify from "browserify";
import source from "vinyl-source-stream";
// import minifyCSS from "gulp-minify-css";
import concat from "gulp-concat";

// function minifyStyles(cb: () => void) {
//     gulp.src("./public/styles/style.css")
//         .pipe(minifyCSS({keepBreaks: true}))
//         .pipe(gulp.dest("dist"));
// }

function copyToProduction(cb: () => void) {
    gulp.src(["./src/test/**/*"])
        .pipe(gulp.dest("./src/prod"));
    cb();
}

function copyPublic(cb: () => void) {
    gulp.src(["./src/dev/public/**/*"])
        .pipe(gulp.dest("./public"));
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
exports.default = series(copyToProduction);