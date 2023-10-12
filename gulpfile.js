var gulp = require("gulp");
var sass = require("gulp-sass")(require('sass'));
var cssnano = require("gulp-cssnano");
var autoprefixer = require('gulp-autoprefixer');
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();

gulp.task("html", function () {
    return gulp.src("./app/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
});

gulp.task("css", function () {
    return gulp.src("./app/css/*.css")
        .pipe(concat('styles.css'))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("sass", function () {
    return gulp.src("./app/sass/*.scss")
        .pipe(concat('styles.scss'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("scripts", function () {
    return gulp.src("./app/js/*.js")
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('imgs', function () {
    return gulp.src("./app/img/*.{jpg,jpeg,png,gif}")
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

gulp.task("watch", function () {
    browserSync.init({
        files: './app/index.html',
        server: {
            baseDir: ["./app", "./dist"]
        }
    });
    gulp.watch("./app/*.html", gulp.series("html"));
    gulp.watch("./app/js/*.js", gulp.series("scripts"));
    gulp.watch("./app/sass/*.scss", gulp.series("sass"));
    gulp.watch("./app/img/*.{jpg,jpeg,png,gif}", gulp.series("imgs"))
    gulp.watch("dist").on('change', browserSync.reload);
});

gulp.task("default", gulp.series("html", "sass", "css", "scripts", "imgs", "watch"));