var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

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
	var inject = require('gulp-inject');

	var wiredepOptions = {
		bowerJson: require('./bower.json'),
		directotry: './public/lib',
		ignorePath: '../../public'
	};

	var injectSrc = gulp.src([
		'./public/css/*.css', 
		'./public/js/*.js'
	], 
		{
			read: false 
		}
	);

	var injectOptions = {
		ignorePath: '/public'
	};

	return gulp.src('./src/views/*.html')
		.pipe(wiredep(wiredepOptions))
		.pipe(inject(injectSrc, injectOptions))
		.pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function() {
	var options = {
		script: 'index.js',
		delayTime: 1,
		env: {
			'PORT': 3000
		},
		watch: jsFiles
	};

	return nodemon(options)
		.on('restart', function(env) {
			console.log('Restarting...');
		});
});