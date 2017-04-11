"use strict"; //eslint-disable-line
require("babel-core/register");
const gulp = require("gulp");
const eslint = require("gulp-eslint");
const del = require("del");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");


gulp.task("clean:server", () => {
  return del(["build/**/*"]);
});

gulp.task("compile:server", ["lint:server"], () => {
  return gulp.src(["src/**/*"])
    .pipe(sourcemaps.init({identityMap: true}))
    .pipe(babel({}))
    .pipe(sourcemaps.write(".", {includeContent: true}))
    .pipe(gulp.dest("build"));
});

gulp.task("lint:server", ["clean:server"], () => {
  return gulp.src(["src/**/*.js"])
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


gulp.task("watch", () => {
  gulp.watch(["src/**/*.*", "./config.js", "./*.config.js"], ["compile:server"]);
});

gulp.task("default", ["compile:server"]);