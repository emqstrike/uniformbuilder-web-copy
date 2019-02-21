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
            'third-party/tippy/tippy.all.min.js',

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
            'uniform-builder-application-ui-new.js',

            // Richardson
            'richardson/uniform-builder-richardson-data.js',
            'richardson/uniform-builder-richardson.js',
            'uniform-builder-fabrics.js',
            'uniform-builder-branding.js',

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

            // Teamstore
            'TeamStoreAPI.js',
            'TeamStoreToolBox.js',
            'uniform-builder-ui-functions.js',

            'uniform-builder-application-ui-new.js',
            'uniform-builder-application-ui-new-letters.js',

            'models/Accent.js',

            // Custom Panels
            'panels/PropertiesPanel.js',
            'panels/PartPanel.js',
            'panels/ColorPanel.js',
            'panels/PatternPanel.js',
            'panels/InsertPanel.js',
            'panels/PipingPanel.js',
            'panels/NumberPanel.js',
            'panels/RandomFeedPanel.js',
            'panels/LogoPanel.js',
            'panels/FabricPanel.js',
            'panels/ColorPalette.js',

            // Controllers or Switchers
            'controllers/PerspectiveController.js',
            'controllers/ModifierController.js',

        ],
        // Result
        'public/uniform-builder/js/ub.js'
    );

    mix.scripts("shopping-cart/ShoppingCart.js", "public/js/shopping-cart/shopping-cart.js");
    mix.scripts("shopping-cart/api/CartItemApi.js", "public/js/shopping-cart/api/cart-item-api.js");
    mix.scripts("shopping-cart/api/CartItemPlayerApi.js", "public/js/shopping-cart/api/cart-item-player-api.js");
    mix.scripts("shopping-cart/api/ClientInfoApi.js", "public/js/shopping-cart/api/client-info-api.js");
    mix.scripts("shopping-cart/api/MaterialApi.js", "public/js/shopping-cart/api/material-api.js");
    mix.scripts("shopping-cart/helpers/JvBs3.js", "public/js/shopping-cart/helpers/jv-bs3.js");

    mix.scripts("shopping-cart/Cart.js", "public/js/shopping-cart/cart.js");
    mix.scripts("shopping-cart/Billing.js", "public/js/shopping-cart/billing.js");
    mix.scripts("shopping-cart/Shipping.js", "public/js/shopping-cart/shipping.js");
    mix.scripts("shopping-cart/ConfirmOrder.js", "public/js/shopping-cart/confirm-order.js");

    mix.scripts("shopping-cart/UBCart.js", "public/js/shopping-cart/ub-cart.js");

    mix.less(
        [
            // Third-party
            'third-party/tipped/tipped.less',
            'third-party/select2/select2.less',
            'property-modifiers-menu.less',

            // Source
            'uniform-builder.less',
            'application-ui-new.less',
            'application-ui-new-letters.less',
            'application-ui-new-numbers.less',
            'application-ui-new-fabrics.less'
        ],

        // Result
        'public/uniform-builder/css/uniform-builder.css'
    );

    mix.sass('shopping-cart.scss', 'public/css/shopping-cart.css');
});
