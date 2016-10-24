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

Route::post('login', 'AuthenticationController@login');
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
Route::get('/builder/{designSetId}/{materialId}', 'UniformBuilderController@loadDesignSet');

// Orders and Profile

Route::get('/my-saved-design/{savedDesignID}', 'UniformBuilderController@mySavedDesign');
Route::get('/my-saved-designs', 'UniformBuilderController@mySavedDesigns');
Route::get('/my-orders', 'UniformBuilderController@myOrders');
Route::get('/my-profile', 'UniformBuilderController@myProfile');
Route::get('/signup', 'UniformBuilderController@signup');
Route::get('/forgot-password', 'UniformBuilderController@forgotPassword');

// End Orders and Profile

// Display the Order
Route::get('orderitem/{orderId}/{orderItemId}', 'UniformBuilderController@loadOrderItem');
Route::get('order/{orderId}', 'UniformBuilderController@loadOrder');
Route::post('saveUniformDesign', 'UniformBuilderController@saveOrder');
Route::post('generateOrderForm', 'UniformBuilderController@generateOrderForm');

// Save Logo 
Route::post('saveLogo', 'UniformBuilderController@saveLogo');

// help Routes
Route::group(array('prefix' => 'help'), function() {
Route::get('getting_started', 'Help\HelpController@getting_started');

});


// Administration Routes
Route::group(array('prefix' => 'administration'), function() {

    Route::get('/', 'Administration\AdministrationController@dashboard');

    // Login
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

    // Mascots
    Route::get('mascots', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@index']);
    Route::post('mascots_filter', 'Administration\MascotsController@indexFiltered');
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

    // Materials
    Route::get('materials', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@index']);
    Route::get('materials/full', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@indexFull']);
    Route::post('material/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@store']);
    Route::post('material/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@store']);
    Route::get('material/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@addMaterialForm']);
    Route::get('material/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@editMaterialForm']);
    Route::get('material/view_material_options/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@getMaterialOptions']);
    Route::get('material/materials_options_setup/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@materialsOptionsSetup']);

    // Materials Options
    Route::post('material_option/save', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@store']);
    Route::post('material_option/saveApplications', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@saveApplications']);
    Route::post('material_option/saveBoundary', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@saveBoundary']);
    Route::post('material_option/saveMultiple', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@storeMultiple']);
    Route::post('material_option/purgeColor', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@purgeColor']);
    Route::post('material_option/saveUpdates', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@updateMaterialOptions']);

    // Messages
    Route::get('messages', ['middleware' => 'adminAccess', 'uses' => 'Administration\MessagesController@index']);
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

    // Route::get('newsletters/{from}/{to}', 'NewsLettersController@dateRange');
    // Route::post('newsletter', 'NewsLettersController@store');
    // Route::post('newsletter/delete', 'NewsLettersController@delete');

    Route::get('test/create', ['middleware' => 'adminAccess', 'uses' => 'Administration\TestsController@uploadFileForm']);
    Route::post('test/uploadFile', ['middleware' => 'adminAccess', 'uses' => 'Administration\TestsController@store']);

});

Route::get('uploadImageForm', 'UploadImageController@uploadImageForm');
Route::post('uploadImage', 'UploadImageController@upload');

Route::post('mobile_notification', 'MobileNotification\MobileNotificationController@store');