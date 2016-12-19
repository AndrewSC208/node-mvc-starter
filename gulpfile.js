var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
	// returning allows us to pipe into anther tesk if needed
	return gulp.src(jsFiles)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {
			verbose: true
		}))
		.pipe(jscs());
});

gulp.task('inject', function() {
	var wiredep = require('wiredep').stream;
	var options = {
		bowerJson: require('./bower.json'),
		directotry: './public/lib',
		ignorePath: '../../public'
	}

	return gulp.src('./src/views/*.html')
		.pipe(wiredep(options))
		.pipe(gulp.dest('./src/views'));
});