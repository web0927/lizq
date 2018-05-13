var gulp = require('gulp');
//转意
var sass = require('gulp-sass');
//添加前缀
var autoprefixer = require('gulp-autoprefixer')
//压缩css 
var minCss = require('gulp-clean-css')
//合并css
var minJs = require('gulp-uglify')
//压缩html
var minHtml = require('gulp-htmlmin');
//删除文件夹
var clean = require('gulp-clean');
//排序
var seq = require('gulp-sequence')
//其服务
var server = require('gulp-webserver');


gulp.task('clean', function () {
    return gulp.src('./libs')
        .pipe(clean())
})

//压缩编译css
gulp.task('css', function () {
    return gulp.src("src/css/**/*.{scss,min.css}")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ["last 2 versions", "Android >= 4.0"]
        }))
        .pipe(minCss())
        .pipe(gulp.dest('libs/css'))
})

//压缩js
gulp.task('minJs', function () {
   return  gulp.src('src/js/**/*.js')
        .pipe(minJs())
        .pipe(gulp.dest('libs/js'))
})

//压缩html
var options = {
    removeComments: true,
    collapseWhitespace:true
}
gulp.task('minHtml', ['css'], function () {
    return gulp.src('src/**/*.html')
        .pipe(minHtml(options))
        .pipe(gulp.dest('libs'))
})

//拷贝font
gulp.task('font', function () {
    return gulp.src('src/font/*')
        .pipe(gulp.dest('libs/font'))
})

//拷贝img
gulp.task('img', function () {
   return  gulp.src('src/img/*')
        .pipe(gulp.dest('libs/img'))
})

//data
gulp.task('data', function () {
    return gulp.src('src/data/*')
        .pipe(gulp.dest('libs/data'))
})

//监听
gulp.task('watch', function () {
    gulp.watch('src/css/**/*.scss', ['css'])
    gulp.watch('src/**/*.html', ['minHtml'])
})

var data = require('./libs/data/data.json');
var url = require('url');

gulp.task('server', function () {
    gulp.src('libs')
        .pipe(server({
            port:8080,
            open:true,
            livereload:true,
            middleware:function (req, res, next) {
                var urls = url.parse(req.url, true)//地址栏参数接口
                console.log(urls)
                if (urls.pathname === '/login') {
                    res.setHeader("Content-Type", "text/json;charset=UTF-8");
                    res.end(JSON.stringify(data))
                }
                
                next()
            }   
        }))
})

gulp.task('default', function (cb) {
    seq('clean', ['css', 'watch', 'minHtml', 'minJs','font','img',"data"], 'server', cb)
});
// gulp.task('default', ['css','minJs','minHtml','watch'])