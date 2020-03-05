"use strict";

// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');

// Importing all the Gulp-related packages we want to use
const less = require('gulp-less');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const postCss = require('gulp-postcss');
const autoPrefixer = require('autoprefixer');
const sourceMaps = require('gulp-sourcemaps');
const uglify =  require('gulp-uglify');
const cssNano = require("cssnano");
const path = require('path');
const _ = require('lodash');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const tap = require('gulp-tap');

const noop = () => {};

// get env
require('dotenv').config();
let appEnv = process.env.APP_ENV;
console.log('###=======GULP4 BUILD STARTED=======###');
console.log('[APP ENV]:', process.env.APP_ENV);


// File paths
const files = {
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
const stylesTask = () => {
    return src(files.lessPath)
        .pipe(appEnv === 'staging' ? sourceMaps.init() : tap(noop))
        .pipe(plumber())
        .pipe(less({paths: [ path.join(__dirname, 'less', 'includes') ]}))
        .pipe(concat('uniform-builder.css'))
        .pipe(appEnv === 'staging' ? cleanCSS({
            debug: true,
            compatibility: 'ie8',
            level: {
                1: {
                    specialComments: 0,
                },
            },
        }): tap(noop))
        .pipe(appEnv === 'staging' ? postCss([autoPrefixer(), cssNano()]) : tap(noop))
        .pipe(rename({ suffix: ".min" }))
        .pipe(appEnv === 'staging' ? sourceMaps.write('.') : tap(noop))
        .pipe(dest('./public/uniform-builder/css'));
};

// JS task: concatenates and uglifies JS files to ub.min.js
const scriptsTask = () => {
    return src(files.jsPath)
        .pipe(appEnv === 'staging' ? sourceMaps.init() : tap(noop))
        .pipe(plumber())
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(concat('ub.js'))
        .pipe(appEnv === 'staging' ? uglify() : tap(noop))
        .pipe(rename({ suffix: ".min" }))
        .pipe(appEnv === 'staging' ? sourceMaps.write('.') : tap(noop))
        .pipe(dest('./public/uniform-builder/js'));
};

// Watch files
const watchFiles = () => {
    watch(files.lessPath, { usePolling: true }, stylesTask);
    watch(files.jsPath, { usePolling: true }, scriptsTask);
};

// Define tasks
const _build = parallel(stylesTask, scriptsTask);
const _watch = watchFiles;

// Export tasks
exports.build = _build;
exports.watch = _watch;
exports.default = _build;