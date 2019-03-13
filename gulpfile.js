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

    // Todo, convert this to mix.js after upgrading to Laravel 5.5
    mix.scripts([

            // Third-party
            'third-party/natural/natural.js',   
            'third-party/natural/all.js',   
            'third-party/tipped/tipped.js',          
            'third-party/select2/select2.full.js',
            'third-party/pixi/pixi.js', 
            'third-party/pixi/pixi.draggable.js',
            
            // Sources

            'utilities.js',
            'uniform-builder-constants.js',
            'uniform-builder-configuration.js',
            'uniform-builder-utilities.js',
            'uniform-builder-helper-functions.js',
            'uniform-builder-error-codes.js',
            'uniform-builder-endpoints.js',
            'uniform-builder-style-configuration.js',
            'uniform-builder-functions.js',
            
            // Brand Specific 

            // Richardson 
            'richardson/uniform-builder-richardson-data.js',
            'richardson/uniform-builder-richardson.js',
            'uniform-builder-fabrics.js',
            'uniform-builder-branding.js',

            // HSEL
            'uniform-builder-hsel.js',

            'uniform-builder-dealership.js',
            'uniform-builder-data.js',
            'uniform-builder-ui-data.js',
            'uniform-builder-application-sizes.js', 
            'uniform-builder-name-drops.js',    
            'uniform-builder-nlp.js',   
            'uniform-builder-mock-data.js', 
            'uniform-builder-status.js',    
            'uniform-builder-math.js',  
            'uniform-builder-interop-is.js',
            'uniform-builder-mascots.js',   
            'uniform-builder-placeholder-applications.js',  
            'uniform-builder-process.js',   
            'uniform-builder-dialogs.js',   
            'uniform-builder-patterns.js',  
            'uniform-builder-applications.js',  
            'uniform-builder-getters-setters.js',       
            'uniform-builder-pipings.js',           
            'uniform-builder-random-feed.js',
            'uniform-builder-plugins.js',
            'uniform-builder-transformers.js',
            'uniform-builder-settings.js',
            'uniform-builder-ui.js',
            'uniform-builder-team-colors.js',
            'uniform-builder-history.js',
            'uniform-builder-fonts.js',
            'uniform-builder-renderer.js',
            'uniform-builder-team-stores.js',
            'uniform-builder-colors.js',
            'uniform-builder-qa-tools.js',
            'uniform-builder-color-utilities.js',
            'uniform-builder-data-patches.js',
            'uniform-builder-loader.js',
            'uniform-builder.js',
            'uniform-builder-sports-specific.js',
            'uniform-builder-custom-artwork-requests.js',
            'uniform-builder-debug-tools.js',
            'uniform-builder-polyfils.js',
            'uniform-builder-shortcuts.js',
            'uniform-builder-generators.js',
            'TeamStoreAPI.js',
            'TeamStoreToolBox.js',

        ], 
        // Result
        'public/uniform-builder/js/ub.js'
    );

    mix.less(
        [
            
            // Third-party
            'third-party/tipped/tipped.less',   
            'third-party/select2/select2.less', 
            
            // Source 
            'uniform-builder.less',

        ],
        
        // Result
        'public/uniform-builder/css/uniform-builder.css');
    
});
