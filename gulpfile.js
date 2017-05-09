var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */


elixir(function(mix) {

     mix.less("uniform-builder.less",'public/uniform-builder/css/uniform-builder.css');
    
     mix.copy('public/jquery/jquery-1.11.3.min.map', 'public/build/jquery-1.11.3.min.map')
          .copy('public/pixi/pixi.js.map', 'public/build/pixi.js.map')
          .scripts([
               'jquery/jquery-1.11.3.min.js',
               'jquery-ui/jquery-ui.min.js',
               'underscore/underscore.js',
               'bootstrap/js/bootstrap.min.js',
               'fabricjs/fabric.min.js',
               'dropzone/dropzone.js',
               'tether/js/tether.js',
               'drop/js/drop.js',
               'pixi/pixi.js',
               'pixi/pixi.draggable.js',
               'opentype/js/opentype.js',
               'scrollTo/jquery.scrollTo.js',
               'slider/jquery.limitslider.js',
               'round-slider/roundslider.min.js',
               'js/libs/creditly/creditly.js',
               'js/libs/mustache/mustache.js',
               'js/libs/smoke/smoke.js',
               'qrcode/jquery.qrcode-0.12.0.js',
               'jspdf/jspdf.min.js',
               'jspdf/addimage.js',
               'jspdf/png.js',
               'jspdf/zlib.js',
               'jspdf/png_support.js',
               'dropdown/jquery.dropdown.js',
               'outside-events/jquery.ba-outside-events.js',
               'colorpicker/js/bootstrap-colorpicker.js',
               'typeahead/typeahead.js',
               'isotope/isotope.pkgd.min.js',
               'sortable/Sortable.js',
               'sortable/jquery.binding.js',
               'sortable/jquery.fn.sortable.js',
               'moment/moment.js',
               'moment/moment-timezone-with-data-2010-2020.min.js',
               'noUiSlider/nouislider.js',
               'bootbox/bootbox.min.js',
               'uniform-builder/js/utilities.js',
               // 'uniform-builder/js/uniform-builder-configuration.js',
               // 'uniform-builder/js/uniform-builder-data.js',
               // 'uniform-builder/js/uniform-builder-utilities.js',
               // 'uniform-builder/js/uniform-builder-mock-data.js',
               // 'uniform-builder/js/uniform-builder-status.js',
               // 'uniform-builder/js/uniform-builder-math.js',
               // 'uniform-builder/js/uniform-builder-placeholder-applications.js',
               // '/uniform-builder/js/uniform-builder-process.js',
               // 'uniform-builder/js/uniform-builder-applications.js',
               // 'uniform-builder/js/uniform-builder-getters-setters.js',
               // 'uniform-builder/js/uniform-builder-pipings.js',
               // 'uniform-builder/js/uniform-builder-random-feed.js',
               // 'uniform-builder/js/uniform-builder-plugins.js',
               // 'uniform-builder/js/uniform-builder-transformers.js',
               // 'uniform-builder/js/uniform-builder-settings.js',
               // 'uniform-builder/js/uniform-builder-ui.js',
               // 'uniform-builder/js/uniform-builder-team-colors.js',
               // 'uniform-builder/js/uniform-builder-history.js',
               // 'uniform-builder/js/uniform-builder-fonts.js',
               // 'uniform-builder/js/uniform-builder-renderer.js',
               // 'uniform-builder/js/uniform-builder.js',
               // 'uniform-builder/js/uniform-builder-debug-tools.js',
               // 'uniform-builder/js/uniform-builder-qa-tools.js',
               // 'uniform-builder/js/uniform-builder-polyfils.js',
               // 'uniform-builder/js/uniform-builder-shortcuts.js'
          ],
          'public/builds/build.js',
          'public'
     );

});
