module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build : {
				src : [
					'js/jquery-2.1.1.js',
					// 'js/jquery-ui-1.10.3.js',
					'js/ejs.js',
				],
				dest : 'js/build/scripts.min.js'
			}
		},
		jshint : {
			all : ['js/core.js', 'js/scripts.js', ]
		},
		svgmin : { // Task
			options : { // Configuration that will be passed directly to SVGO
				plugins : [
					{removeViewBox : false}, 
					{removeUselessStrokeAndFill : false},
					{cleanupIDs : false}
				]
			},
			dist : { // Target
				files : { // Dictionary of files
					'assets/img/jersey_back_4040.min.svg' : 'assets/img/jersey_back_4040.svg', // 'destination': 'source'
					'assets/img/jersey_front_4040.min.svg' : 'assets/img/jersey_front_4040.svg',

				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-svgmin');

	// grunt.registerTask('default', ['uglify']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('build', ['uglify', 'svgmin']);

};