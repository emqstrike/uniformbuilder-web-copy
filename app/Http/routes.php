<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return redirect('/index');
});

Route::post('lrest', 'AuthenticationController@lrest');
Route::post('login', 'AuthenticationController@login');
Route::get('remote-login/{id}/{accessToken}', 'AuthenticationController@remoteLogin');
Route::get('logout', 'AuthenticationController@logout');
Route::post('register', 'RegistrationController@register');
Route::get('forgotPassword', 'AuthenticationController@forgotPasswordForm');
Route::get('resetPassword/{hash}', 'AuthenticationController@resetPasswordForm');
Route::post('saveNewPassword', 'AuthenticationController@saveNewPassword');
Route::post('recoverPassword', 'AuthenticationController@recoverPassword');
Route::get('changePassword', ['middleware' => 'adminAccess', 'uses' => 'AuthenticationController@changePasswordForm']);
Route::post('saveChangedPassword', ['middleware' => 'adminAccess', 'uses' => 'AuthenticationController@saveChangedPassword']);
Route::get('activateUser/{activationCode}', 'RegistrationController@activateUser');
Route::get('index', 'UniformBuilderController@showBuilder');
Route::get('uniform-builder', 'UniformBuilderController@showBuilder');
Route::get('/builder/{designSetId}', 'UniformBuilderController@loadDesignSet');
Route::get('/builder/{designSetId}/{materialId}/{store_code?}/{team_name?}/{team_colors?}/{jerysey_name?}/{jersey_number?}/{mascot_id?}/{save_rendered?}/{save_rendered_timeout?}/{product_id?}', 'UniformBuilderController@loadDesignSet');
Route::get('/builder/{designSetId}/{materialId}/render', 'UniformBuilderController@loadDesignSetRender');
Route::get('/styles/{gender}/{sport?}', 'UniformBuilderController@styles');

// Utilities
Route::get('/utilities/previewEmbellishmentInfo/{embellishmentID}', 'UniformBuilderController@previewEmbellishmentInfo');

Route::group([
    'prefix' => 'teamstore'
], function() {
    Route::get('load_material/{material_id}/{store_code?}/{team_name?}/{team_colors?}/{jerysey_name?}/{jersey_number?}/{mascot_id?}/{save_rendered?}/{save_rendered_timeout?}/{product_id?}', 'UniformBuilderController@load_material');
});

// Save uniform perspectives
Route::post('/save_uniform_perspectives', 'ProductController@savePerspectives');

// Orders and Profile

// Showcase design
Route::get('/showcase/{showcaseDesignId}', 'UniformBuilderController@showcaseDesign');
// Saved design
Route::get('/my-saved-design/{savedDesignID}', 'UniformBuilderController@mySavedDesign');
Route::get('/my-saved-design/{savedDesignID}/render', 'UniformBuilderController@mySavedDesignRender');
Route::get('/my-saved-designs', 'UniformBuilderController@mySavedDesigns');
Route::get('/my-orders', 'UniformBuilderController@myOrders');
Route::get('/my-profile', 'UniformBuilderController@myProfile');
Route::get('/signup', 'UniformBuilderController@signup');
Route::get('/forgot-password', 'UniformBuilderController@forgotPassword');

// End Orders and Profile

// Custom Artwork Requests
Route::get('/my-custom-artwork-requests', 'UniformBuilderController@myCustomArtworkRequests');



// Display the Order
Route::get('orderitem/{orderId}/{orderItemId}', 'UniformBuilderController@loadOrderItem');
Route::get('order/{orderId}', 'UniformBuilderController@loadOrder');

Route::get('order/view/{orderId}', 'UniformBuilderController@viewOrder');

Route::post('saveUniformDesign', 'UniformBuilderController@saveOrder');
Route::post('generateOrderForm', 'UniformBuilderController@generateOrderForm');

// Save Logo
Route::post('saveLogo', 'UniformBuilderController@saveLogo');
Route::post('saveImageResized', 'UniformBuilderController@saveImageResized');

// help Routes
Route::group(array('prefix' => 'help'), function() {
Route::get('getting_started', 'Help\HelpController@getting_started');

});


// Administration Routes
Route::group(array('prefix' => 'administration'), function() {
    Route::get('custom_artwork_requests', 'Administration\CustomArtworkRequestController@index')->name('indexCustomArtworkRequests');
    Route::get('custom_artwork_requests/processing', 'Administration\CustomArtworkRequestController@getProcessing')->name('getProcessingCustomArtworkRequests');
    Route::get('upload_custom_artwork/{id}', 'Administration\CustomArtworkRequestController@upload')->name('uploadCustomArtworkRequest');

    Route::get('/', 'Administration\AdministrationController@dashboard');

    // Logins
    Route::get('login', 'Administration\AuthenticationController@loginForm');
    Route::post('login', 'Administration\AuthenticationController@administrationLogin');
    Route::get('logout', 'Administration\AuthenticationController@administrationLogout');

    // Admin page
    Route::get('main', ['middleware' => 'adminAccess', 'uses' => 'Administration\AdministrationController@dashboard']);

     // Accents
    Route::get('accent/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\AccentsController@create']);
    Route::post('accent/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\AccentsController@store']);
    Route::get('accents', ['middleware' => 'adminAccess', 'uses' => 'Administration\AccentsController@index']);
    Route::get('accent/edit/{id}', 'Administration\AccentsController@editAccentForm');
    Route::post('accent/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\AccentsController@store']);

    // Users
    Route::get('users', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@index']);
    Route::post('user/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@store']);
    Route::post('user/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@store']);
    Route::get('user/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@addUserForm']);
    Route::get('user/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@editUserForm']);
    Route::get('account_settings/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@accountSettings']);
    Route::post('account_settings/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@store']);
    Route::get('account_settings/change_password/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@changePasswordForm']);
    Route::post('account_settings/change_password', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@changePassword']);
    Route::get('rejected_users' , 'Administration\UsersController@getRejectedUsers');
    Route::get('user/orders/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@userOrders']);

    // Factories
    Route::get('factories', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@index']);
    Route::post('factory/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@store']);
    Route::post('factory/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@store']);
    Route::get('factory/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@addFactoryForm']);
    Route::get('factory/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@editFactoryForm']);

    // Uniform Categories
    Route::get('categories', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@index']);
    Route::post('category/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@store']);
    Route::post('category/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@store']);
    Route::get('category/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@addCategoryForm']);
    Route::get('category/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@editCategoryForm']);

    // Colors
    Route::get('colors', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@index']);
    Route::get('colors/updateAll', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@updateColors']);
    Route::post('color/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@store']);
    Route::post('color/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@store']);
    Route::get('color/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@addColorForm']);
    Route::get('color/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@editColorForm']);

    // Colors Sets
    Route::get('colors_sets', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsSetsController@index']);
    Route::get('colors_set/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsSetsController@addColorsSetForm']);
    Route::post('colors_set/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsSetsController@store']);
    Route::post('colors_set/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsSetsController@store']);
    Route::get('colors_set/edit/{id}', 'Administration\ColorsSetsController@editColorsSetForm');

    // Mascots
    Route::get('mascots', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@index']);
    Route::post('mascots_filter', 'Administration\MascotsController@indexFiltered');
    Route::get('mascot/search', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@searchPage']);
    Route::post('mascot/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@store']);
    Route::post('mascot/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@store']);
    Route::get('mascot/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addMascotForm']);
    Route::get('mascot/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@editMascotForm']);
    Route::get('mascots_categories', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@index']);
    Route::get('mascots_groups_categories', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsGroupsCategoriesController@index']);
    Route::get('mascots_groups_categories/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsGroupsCategoriesController@addMascotsGroupsCategoryForm']);
    Route::get('mascots_categories/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@addMascotsCategoryForm']);
    Route::post('mascots_categories/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@store']);
    Route::post('mascots_groups_categories/update', 'Administration\MascotsGroupsCategoriesController@store');
    Route::post('mascots_groups_categories/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsGroupsCategoriesController@store']);
    Route::post('mascots_categories/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@store']);
    Route::get('mascots_categories/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@editMascotsCategoriesForm']);
    Route::get('mascots_groups_categories/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsGroupsCategoriesController@editMascotsGroupsCategoriesForm']);
    Route::get('upload_artwork/{artwork_request_id}/{artwork_index}/{artwork_user_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addArtworkForm']);
    Route::get('upload_logo_request/{logo_request_id}/{logo_index}/{logo_request_user_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addLogoRequestForm']);
    Route::get('upload_existing_artwork/{artwork_request_id}/{artwork_index}/{artwork_user_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addExistingArtworkForm']);
    Route::get('upload_existing_logo/{logo_request_id}/{logo_index}/{logo_request_user_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addExistingLogoForm']);
    Route::post('artwork/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@storeArtwork']);
    Route::post('artwork/add_existing', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@storeExistingArtwork']);
    Route::post('logo/add_existing', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@storeExistingLogo']);
    Route::post('logo/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@storeArtwork']);

    // Materials
    Route::get('materials', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@index']);
    Route::get('materials/{sport?}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@indexSport']);
    Route::get('materials/full', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@indexFull']);
    Route::post('material/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@store']);
    Route::post('material/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@store']);
    Route::get('material/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@addMaterialForm']);
    Route::get('material/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@editMaterialForm']);
    Route::get('material/view_material_options/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@getMaterialOptions']);
    Route::get('material/materials_options_setup/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@materialsOptionsSetup']);
    Route::get('material/piping/{id}/{page_number}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@editPipingForm']);
    Route::get('material/{id}/pipings', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@pipings']);
    Route::get('material/{id}/random_feed', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@randomFeed']);
    Route::post('material/piping/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@updatePiping']);
    Route::post('material/updatePipings', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@updatePipings']);
    Route::post('material/updateRandomFeed', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@updateRandomFeed']);
    Route::get('material/materials_options/dropzone/{material_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@dropZone']);
    Route::post('material/insert_dz_image', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@insertDropzoneImage']);
    Route::post('material/insert_dz_design_sheet', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@insertDesignSheet']);
    Route::get('material/single_page', 'Administration\MaterialsController@singlePage');

    // Materials Options
    Route::post('material_option/save', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@store']);
    Route::post('material_option/saveApplications', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@saveApplications']);
    Route::post('material_option/saveBoundary', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@saveBoundary']);
    Route::post('material_option/saveMultiple', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@storeMultiple']);
    Route::post('material_option/purgeColor', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@purgeColor']);
    Route::post('material_option/saveUpdates', 'Administration\MaterialsOptionsController@updateMaterialOptions');

    // Messages
    Route::get('messages', ['middleware' => 'adminAccess', 'uses' => 'Administration\MessagesController@getUserMessages']);
    Route::get('message/compose', ['middleware' => 'adminAccess', 'uses' => 'Administration\MessagesController@composeForm']);

    // Base Models
    Route::get('models', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@index']);
    Route::post('model/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@store']);
    Route::post('model/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@store']);
    Route::get('model/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@addModelForm']);
    Route::get('model/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@editModelForm']);

    // Patterns
    Route::get('patterns', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@index']);
    Route::post('pattern/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@store']);
    Route::post('pattern/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@store']);
    Route::get('pattern/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@addPatternForm']);
    Route::get('pattern/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@editPatternForm']);

    // Placeholders
    Route::get('placeholders', ['middleware' => 'adminAccess', 'uses' => 'Administration\PlaceholdersController@index']);
    Route::get('placeholder/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PlaceholdersController@addPlaceholderForm']);
    Route::post('placeholder/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PlaceholdersController@store']);

    // Price Items
    Route::get('price_items', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemsController@index']);
    Route::get('price_item/materials', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemsController@materialsTable']);
    Route::get('price_items/manual_update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemsController@manualUpdate']);

    // Preferences
    Route::get('preferences', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@index']);
    Route::get('preference/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@addPreferenceForm']);
    Route::post('preference/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@store']);
    Route::get('preference/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@editPreferenceForm']);
    Route::post('preference/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@store']);

    // Fonts
    Route::get('fonts', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@index']);
    Route::post('font/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@store']);
    Route::post('font/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@store']);
    Route::get('font/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@addFontForm']);
    Route::get('font/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@editFontForm']);

    // Gradients
    Route::get('gradients', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@index']);
    Route::post('gradient/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@store']);
    Route::post('gradient/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@store']);
    Route::get('gradient/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@addGradientForm']);
    Route::get('gradient/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@editGradientForm']);

    // Cut Styles
    Route::get('cuts/neck-styles', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@neckStyles']);
    Route::get('cuts/sleeve-styles', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@sleeveStyles']);
    Route::get('cuts/waist-cuts', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@waistCuts']);
    Route::get('cuts/pant-cuts', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@pantCuts']);
    Route::get('cuts/sleeve-panels', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@sleevePanels']);
    Route::get('cuts/shoulder-panels', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@shoulderPanels']);
    Route::get('cuts/underarm-panels', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@underarmPanels']);
    Route::post('cut/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@store']);
    Route::post('cut/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@store']);
    Route::get('cut/add/{type}', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@addForm']);
    Route::get('cut/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutStylesController@editForm']);

    // Fabrics
    Route::get('fabrics', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@index']);
    Route::post('fabric/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@store']);
    Route::post('fabric/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@store']);
    Route::get('fabric/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@addForm']);
    Route::get('fabric/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@editForm']);

    // Uniform Design Sets
    Route::get('design_sets', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@index']);
    Route::post('design_set/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@store']);
    Route::post('design_set/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@store']);
    Route::get('design_set/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@addForm']);
    Route::get('design_set/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@editForm']);

    // Linings
    Route::get('linings', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@index']);
    Route::post('lining/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@store']);
    Route::post('lining/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@store']);
    Route::get('lining/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@addForm']);
    Route::get('lining/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@editForm']);

     // Splash
    Route::get('splash_images', ['middleware' => 'adminAccess', 'uses' => 'Administration\SplashImagesController@index']);
    Route::post('splash_image/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\SplashImagesController@store']);
    Route::get('splash_image/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\SplashImagesController@create']);
    Route::get('splash_image/edit/{id}', 'Administration\SplashImagesController@editSplashImageForm');
    Route::post('splash_image/update', 'Administration\SplashImagesController@store');

    // Orders
    Route::get('orders', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@index']);
    Route::get('orders/test_orders', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@testOrders']);
    Route::get('orders/sent_orders', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@indexSentOrders']);
    Route::post('order/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@store']);
    Route::post('order/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@store']);
    Route::get('order/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@addForm']);
    Route::get('order/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@editForm']);
    Route::get('canvas', ['middleware' => 'adminAccess', 'uses' => 'Administration\CanvasController@index']);
    Route::get('canvas/texturing-guide', ['middleware' => 'adminAccess', 'uses' => 'Administration\CanvasController@texturing_guide']);

    // Block Patterns
    Route::get('block_patterns', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@index']);
    Route::get('block_pattern/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@addForm']);
    Route::post('block_pattern/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@store']);
    Route::get('block_pattern/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@editForm']);
    Route::post('block_pattern/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@store']);

    // Feature Flags
    Route::get('feature_flags', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@index']);
    Route::get('feature_flag/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@addForm']);
    Route::post('feature_flag/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@store']);
    Route::get('feature_flag/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@editForm']);
    Route::post('feature_flag/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@store']);

    // Helpers
    Route::get('helpers', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@index']);
    Route::get('helper/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@addForm']);
    Route::post('helper/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@store']);
    Route::get('helper/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@editForm']);
    Route::post('helper/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@store']);

    // NewsLetters
    Route::get('news_letters', 'Administration\NewsLettersController@index');

    // Test
    Route::get('test/create', ['middleware' => 'adminAccess', 'uses' => 'Administration\TestsController@uploadFileForm']);
    Route::post('test/uploadFile', ['middleware' => 'adminAccess', 'uses' => 'Administration\TestsController@store']);

    // Materials Fabric
    Route::get('materials_fabrics', 'Administration\MaterialsFabricsController@index');
    Route::post('materials_fabric/add', 'Administration\MaterialsFabricsController@store');
    Route::get('materials_fabric/add', 'Administration\MaterialsFabricsController@create');
    Route::get('materials_fabric/edit/{id}', 'Administration\MaterialsFabricsController@editMaterialFabricForm');
    Route::post('materials_fabric/delete', 'Administration\MaterialsFabricsController@delete');
    Route::get('materials_fabric/{id}', 'Administration\MaterialsFabricsController@show');
    Route::post('materials_fabric/update', 'Administration\MaterialsFabricsController@store');

    // Artworks
    Route::get('artwork_requests', 'Administration\ArtworksController@index');
    Route::get('artwork_requests/processing', 'Administration\ArtworksController@processing');

    // Logo Requests
    Route::get('logo_requests', 'Administration\LogoRequestsController@index');

    // Feedbacks
    Route::get('feedbacks', 'Administration\FeedbacksController@index');
    Route::get('feedback/reply/{id}', 'Administration\FeedbacksController@reply');
    Route::get('feedback/thread/{id}', 'Administration\FeedbacksController@viewThread');

      // Mockup set
     Route::get('mockup_sets', 'Administration\MockupSetsController@index');
     Route::get('mockup_set/{id}', 'Administration\MockupSetsController@show');

    // Price Item Templates
    Route::get('price_item_templates', 'Administration\PriceItemTemplatesController@index');
    Route::get('price_item_template/add', 'Administration\PriceItemTemplatesController@addForm');
    Route::post('price_item_template', 'Administration\PriceItemTemplatesController@store');
    Route::get('price_item_template/{id}', 'Administration\PriceItemTemplatesController@show');
    Route::get('price_item_template/edit/{id}', 'Administration\PriceItemTemplatesController@editForm');
    Route::post('price_item_template/update', 'Administration\PriceItemTemplatesController@store');

    // Saved Designs
    Route::get('saved_designs', 'Administration\SavedDesignsController@index');

    // Tailsweeps
    Route::get('tailsweeps', 'Administration\TailsweepsController@index');
    Route::get('tailsweep/add', 'Administration\TailsweepsController@create');
    Route::post('tailsweep/add', 'Administration\TailsweepsController@store');
    Route::get('tailsweep/edit/{id}', 'Administration\TailsweepsController@editTailsweepForm');
    Route::post('tailsweep/update', 'Administration\TailsweepsController@store');

    // Mascot sizes
    Route::get('mascot_sizes', 'Administration\MascotSizesController@index');
    Route::get('mascot_size/add', 'Administration\MascotSizesController@addMascotSizeForm');
    Route::post('mascot_size/add', 'Administration\MascotSizesController@store');
    Route::get('mascot_size/edit/{id}', 'Administration\MascotSizesController@editMascotSizeForm');
    Route::post('mascot_size/update', 'Administration\MascotSizesController@store');

    // Applications sizes
    Route::get('application_sizes', 'Administration\ApplicationSizesController@index');
    Route::get('application_size/add', 'Administration\ApplicationSizesController@addForm');
    Route::post('application_size/add', 'Administration\ApplicationSizesController@store');
    Route::get('application_size/edit/{id}', 'Administration\ApplicationSizesController@editForm');
    Route::post('application_size/update', 'Administration\ApplicationSizesController@store');

    // Parts Aliases
    Route::get('parts_aliases', 'Administration\PartsAliasesController@index');
    Route::get('parts_aliases/add', 'Administration\PartsAliasesController@addForm');
    Route::post('parts_aliases/add', 'Administration\PartsAliasesController@store');
    Route::post('parts_aliases/update', 'Administration\PartsAliasesController@store');
    Route::get('parts_aliases/edit/{id}', 'Administration\PartsAliasesController@edit');

    //Sales Reps
    Route::get('sales_reps/add' , 'Administration\SalesRepresentativesController@create' );
    Route::post('sales_reps/add' , 'Administration\SalesRepresentativesController@store');
    Route::get('sales_reps' , 'Administration\SalesRepresentativesController@index');
    Route::get('sales_reps/edit/{id}' , 'Administration\SalesRepresentativesController@edit');
    Route::post('sales_reps/update' , 'Administration\SalesRepresentativesController@store');

    //Cuts Links
    Route::get('cuts_links/add', 'Administration\CutsLinksController@create');
    Route::post('cuts_links/add', 'Administration\CutsLinksController@store');
    Route::get('cuts_links', 'Administration\CutsLinksController@index');
    Route::get('cuts_links/edit/{id}', 'Administration\CutsLinksController@edit');
    Route::post('cuts_links/update', 'Administration\CutsLinksController@store');

    //Dealers
    Route::get('dealers/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@create']);
    Route::post('dealers/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@store']);
    Route::get('dealers', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@index']);
    Route::get('dealers/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@edit']);
    Route::post('dealers/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@store']);

    // Style Requests
    Route::get('style_requests', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleRequestsController@index']);
    Route::get('approved_style_requests', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleRequestsController@approvedIndex']);
    Route::get('style_viewer', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleRequestsController@styleViewer']);
    Route::get('styles_stats', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleRequestsController@stylesStats']);

    //Item Sizes
    Route::get('item_sizes', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@index']);
    Route::get('item_size/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@create']);
    Route::post('item_size/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@store']);
    Route::get('item_size/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@edit']);
    Route::post('item_size/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@store']);

    //Inksoft Designs
    Route::get('inksoft_designs', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@index']);
    Route::get('inksoft_design/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@create']);
    Route::post('inksoft_design/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@store']);
    Route::get('inksoft_design/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@edit']);
    Route::post('inksoft_design/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@store']);

    //Styles Index
    Route::get('styles_indexes', ['middleware' => 'adminAccess', 'uses' => 'Administration\StylesIndexesController@index']);
    Route::get('styles_index/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\StylesIndexesController@create']);
    Route::post('styles_index/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\StylesIndexesController@store']);
    Route::get('styles_index/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\StylesIndexesController@edit']);
    Route::post('styles_index/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\StylesIndexesController@store']);

    //Styles Index Items
    Route::get('/styles_index/items/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleIndexItemsController@getByStyleID']);
    Route::get('/style_index_item/add/{style_index_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleIndexItemsController@create']);
    Route::post('style_index_item/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleIndexItemsController@store']);
    Route::get('style_index_item/edit/{style_index_id}/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleIndexItemsController@edit']);
    Route::post('style_index_item/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleIndexItemsController@store']);
});

Route::get('/messages', 'UniformBuilderController@myMessages');

Route::get('uploadImageForm', 'UploadImageController@uploadImageForm');
Route::post('uploadImage', 'UploadImageController@upload');
Route::post('/fileUpload', 'UniformBuilderController@fileUpload');
Route::post('mobile_notification', 'MobileNotification\MobileNotificationController@store');
