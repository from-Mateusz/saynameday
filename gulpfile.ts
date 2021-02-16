import gulp from "gulp";
import { series } from "gulp";
import filter from "gulp-filter";

function copyViews(cb: () => void) {
    gulp.src("./src/views/**/*")
        .pipe(gulp.dest("./build/views"));
    cb();
}

exports.default = series(copyViews);