import gulp from "gulp";
import { series } from "gulp";
import concat from "gulp-concat";

function copyViews(cb: () => void) {
    gulp.src(["./src/views/images", "./src/views/styles"])
        .pipe(gulp.dest("./build/views"));
    cb();
}

function buildClientSideScripts(cb: () => void) {
    gulp.src(["./src/views/scripts/extensions.js", "./src/views/scripts/logger.js", "./src/views/scripts/utils.js", "./src/views/scripts/saynameday.js"])
        .pipe(concat("snd.js"))
        .pipe(gulp.dest("./build/views/scripts/"));
    cb();
}

exports.default = series(copyViews, buildClientSideScripts);