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

			// Sources

			'resources/assets/js/utilities.js',
			'resources/assets/js/uniform-builder-configuration.js',
			'resources/assets/js/uniform-builder-utilities.js',
			'resources/assets/js/uniform-builder-helper-functions.js',
			'resources/assets/js/uniform-builder-error-codes.js',
			'resources/assets/js/uniform-builder-endpoints.js',
			'resources/assets/js/uniform-builder-style-configuration.js',
			'resources/assets/js/uniform-builder-branding.js',
			'resources/assets/js/uniform-builder-dealership.js',
			'resources/assets/js/uniform-builder-data.js',
			'resources/assets/js/uniform-builder-ui-data.js',
			'resources/assets/js/uniform-builder-application-sizes.js',	
			'resources/assets/js/uniform-builder-name-drops.js',	
			'resources/assets/js/uniform-builder-nlp.js',	
			'resources/assets/js/uniform-builder-mock-data.js',	
			'resources/assets/js/uniform-builder-status.js',	
			'resources/assets/js/uniform-builder-math.js',	
			'resources/assets/js/uniform-builder-interop-is.js',	
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
			'resources/assets/js/uniform-builder.js',
			'resources/assets/js/uniform-builder-custom-artwork-requests.js',
			'resources/assets/js/uniform-builder-debug-tools.js',
			'resources/assets/js/uniform-builder-polyfils.js',
			'resources/assets/js/uniform-builder-shortcuts.js',
			'resources/assets/js/uniform-builder-generators.js',
			'resources/assets/js/TeamStoreAPI.js',
			'resources/assets/js/TeamStoreToolBox.js',

		], 
			// Result
			'public/uniform-builder/js/ub.js'
	);

    mix.less("uniform-builder.less",'public/uniform-builder/css/uniform-builder.css');
    
});
