"use strict";

// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
var { src, dest, watch, series, parallel } = require('gulp');

// Importing all the Gulp-related packages we want to use
var less = require('gulp-less');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var postCss = require('gulp-postcss');
var autoPrefixer = require('autoprefixer');
var sourceMaps = require('gulp-sourcemaps');
var uglify =  require('gulp-uglify');
var cssNano = require("cssnano");
var path = require('path');
var _ = require('lodash');

// File paths
var files = {
    lessPath: [
        // Third-party
        'resources/assets/less/third-party/tipped/tipped.less',
        'resources/assets/less/third-party/select2/select2.less',

        // Source
        'resources/assets/less/uniform-builder.less',
    ],
    jsPath: [

        // Third-party
        'resources/assets/js/third-party/natural/natural.js',
        'resources/assets/js/third-party/natural/all.js',
        'resources/assets/js/third-party/tipped/tipped.js',
        'resources/assets/js/third-party/select2/select2.full.js',
        'resources/assets/js/third-party/pixi/pixi.js',
        'resources/assets/js/third-party/pixi/pixi.draggable.js',

        // Sources

        'resources/assets/js/utilities.js',
        'resources/assets/js/uniform-builder-constants.js',
        'resources/assets/js/uniform-builder-configuration.js',
        'resources/assets/js/uniform-builder-utilities.js',
        'resources/assets/js/uniform-builder-helper-functions.js',
        'resources/assets/js/uniform-builder-error-codes.js',
        'resources/assets/js/uniform-builder-endpoints.js',
        'resources/assets/js/uniform-builder-style-configuration.js',
        'resources/assets/js/uniform-builder-functions.js',

        // Brand Specific

        // Richardson
        'resources/assets/js/richardson/uniform-builder-richardson-data.js',
        'resources/assets/js/richardson/uniform-builder-richardson.js',
        'resources/assets/js/uniform-builder-fabrics.js',
        'resources/assets/js/uniform-builder-branding.js',

        // HSEL
        'resources/assets/js/uniform-builder-hsel.js',

        'resources/assets/js/uniform-builder-dealership.js',
        'resources/assets/js/uniform-builder-data.js',

        //picker
        'resources/assets/js/uniform-builder-picker.js',

        'resources/assets/js/uniform-builder-ui-data.js',
        'resources/assets/js/uniform-builder-application-sizes.js',
        'resources/assets/js/uniform-builder-name-drops.js',
        'resources/assets/js/uniform-builder-nlp.js',
        'resources/assets/js/uniform-builder-mock-data.js',
        'resources/assets/js/uniform-builder-status.js',
        'resources/assets/js/uniform-builder-math.js',
        'resources/assets/js/uniform-builder-interop-is.js',
        'resources/assets/js/uniform-builder-mascots.js',
        'resources/assets/js/uniform-builder-placeholder-applications.js',
        'resources/assets/js/uniform-builder-process.js',
        'resources/assets/js/uniform-builder-dialogs.js',
        'resources/assets/js/uniform-builder-patterns.js',
        'resources/assets/js/uniform-builder-applications.js',
        'resources/assets/js/uniform-builder-getters-setters.js',
        'resources/assets/js/uniform-builder-pipings.js',
        'resources/assets/js/uniform-builder-random-feed.js',
        'resources/assets/js/uniform-builder-plugins.js',
        'resources/assets/js/uniform-builder-transformers.js',
        'resources/assets/js/uniform-builder-settings.js',
        'resources/assets/js/uniform-builder-ui.js',
        'resources/assets/js/uniform-builder-team-colors.js',
        'resources/assets/js/uniform-builder-history.js',
        'resources/assets/js/uniform-builder-fonts.js',
        'resources/assets/js/uniform-builder-renderer.js',
        'resources/assets/js/uniform-builder-team-stores.js',
        'resources/assets/js/uniform-builder-colors.js',
        'resources/assets/js/uniform-builder-qa-tools.js',
        'resources/assets/js/uniform-builder-color-utilities.js',
        'resources/assets/js/uniform-builder-data-patches.js',
        'resources/assets/js/uniform-builder-loader.js',
        'resources/assets/js/uniform-builder.js',
        'resources/assets/js/uniform-builder-sports-specific.js',
        'resources/assets/js/uniform-builder-custom-artwork-requests.js',
        'resources/assets/js/uniform-builder-debug-tools.js',
        'resources/assets/js/uniform-builder-polyfils.js',
        'resources/assets/js/uniform-builder-shortcuts.js',
        'resources/assets/js/uniform-builder-generators.js',
        'resources/assets/js/TeamStoreAPI.js',
        'resources/assets/js/TeamStoreToolBox.js'
    ]
};

// Less task: compiles less files into uniform-builder.min.css
function stylesTask() {
    return src(files.lessPath)
        .pipe(sourceMaps.init())
        .pipe(less({paths: [ path.join(__dirname, 'less', 'includes') ]}))
        .pipe(concat('uniform-builder.css'))
        .pipe(cleanCSS({
            debug: true,
            compatibility: 'ie8',
            level: {
                1: {
                    specialComments: 0,
                },
            },
        }))
        .pipe(postCss([autoPrefixer(), cssNano()]))
        .pipe(sourceMaps.write('.'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest('./public/uniform-builder/css'));
}

// JS task: concatenates and uglifies JS files to ub.min.js
function scriptsTask() {
    return src(files.jsPath)
        .pipe(concat('ub.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest('./public/uniform-builder/js'));
}

// Watch task: watch Less and JS files for changes
// If any change, run less and js tasks simultaneously
function watchTask() {
    console.info('----------> NOW WATCHING FILES FOR CHANGES 👁👁')
    // console.table(_.concat(files.lessPath, files.jsPath));
    watch(files.lessPath, series(stylesTask));
    watch(files.jsPath, series(scriptsTask));
    // watch(_.concat(files.lessPath, files.jsPath), parallel(stylesTask, scriptsTask));
    // console.log('[===WATCHING FILES===]', _.concat(files.lessPath, files.jsPath));
}

// Export the default Gulp task so it can be run
// Runs the less and js tasks simultaneously
// then watch task
exports.default = series(
    parallel(stylesTask, scriptsTask),
    watchTask
);
