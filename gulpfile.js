var gulp = require('gulp');
var pipe = require('pipe/gulp');
var traceur = require('gulp-traceur');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var mergeStreams = require('event-stream').merge;

var path = {
  templating: {
    lib: ['./node_modules/templating/src/lib/**/*.js'],
    util: ['./node_modules/templating/src/util/**/*.js', './node_modules/templating/src/lib/load_barrier.js']
  },
  deps: {
    'watchtower': './node_modules/templating/node_modules/watchtower/src/**/*.js',
    'expressionist': './node_modules/templating/node_modules/expressionist/src/**/*.js',
    'di': './node_modules/templating/node_modules/di/src/**/*.js',
    'rtts-assert': './node_modules/rtts-assert/src/**/*.js'
  },
  employees: ['./js/**/*.js'],
  build: './build'
};

gulp.task('clean', function () {
  return gulp.src(path.build + '**/*', {read: false})
             .pipe(clean());
});

gulp.task('build-deps', function() {
  var streams = Object.keys(path.deps).map(function(prop) {
    return gulp.src(path.deps[prop])
               .pipe(traceur(pipe.traceur({ modules: 'amd' })))
               .pipe(gulp.dest(path.build + '/js/' + prop));
  });
  return mergeStreams.apply(null, streams);
});

gulp.task('build-templating', function() {
  var streams = [
    gulp.src(path.templating.lib)
        .pipe(traceur(pipe.traceur({ modules: 'amd' })))
        .pipe(gulp.dest(path.build + '/js/templating/lib')),

    gulp.src(path.templating.util)
        .pipe(traceur(pipe.traceur({ modules: 'inline' })))
        .pipe(gulp.dest(path.build + '/js/templating/util'))
  ];
  return mergeStreams.apply(null, streams);
});

gulp.task('build-employees', function() {
  return gulp.src(path.employees)
             .pipe(traceur(pipe.traceur({ modules: 'amd' })))
             .pipe(gulp.dest(path.build + '/js/employees'));
});

gulp.task('build', ['build-templating', 'build-deps', 'build-employees']);

gulp.task('watch', function() {
  gulp.watch(path.employees, ['build-employees']);
});

gulp.task('serve', connect.server({
  root: [__dirname],
  port: 8888
}));