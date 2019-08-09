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

Route::get('/down', function () {
    return redirect('/down');
});

Route::get('down', 'UniformBuilderController@downBuilder');

Route::post('lrest', 'AuthenticationController@lrest');
Route::post('login', 'AuthenticationController@login');
Route::get('logout', 'AuthenticationController@logout');
Route::post('register', 'RegistrationController@register');
Route::get('forgotPassword', 'AuthenticationController@forgotPasswordForm');
Route::get('resetPassword/{hash}', 'AuthenticationController@resetPasswordForm');
Route::post('saveNewPassword', 'AuthenticationController@saveNewPassword');
Route::post('recoverPassword', 'AuthenticationController@recoverPassword');
Route::get('changePassword', 'AuthenticationController@changePasswordForm');
Route::post('saveChangedPassword', 'AuthenticationController@saveChangedPassword');
Route::get('activateUser/{activationCode}', 'RegistrationController@activateUser');
Route::get('index', 'UniformBuilderController@showBuilder');
Route::get('uniform-builder', 'UniformBuilderController@showBuilder');
Route::get('/builder/{designSetId}', 'UniformBuilderController@loadDesignSet');
Route::get('/builder/{designSetId}/{materialId}/{store_code?}/{team_name?}/{team_colors?}/{jerysey_name?}/{jersey_number?}/{mascot_id?}/{save_rendered?}/{save_rendered_timeout?}/{product_id?}', 'UniformBuilderController@loadDesignSet');
Route::get('/builder/{designSetId}/{materialId}/render', 'UniformBuilderController@loadDesignSetRender');
Route::get('/styles/{gender}/{sport?}/{block_pattern?}/{org?}', 'UniformBuilderController@styles');

//Stand Alone Saved Designs Page
Route::get('saved_design/login', 'AdministrationV2\SavedDesignsController@loginForm')->name('saved_designs_login_form');
Route::post('saved_design/login', 'AdministrationV2\SavedDesignsController@savedDesignsLogin')->name('saved_designs_stand_alone_login');
Route::get('saved_designs/{currentPage?}', ['middleware' => 'accessSavedDesigns', 'uses' => 'AdministrationV2\SavedDesignsController@standAlone'])->name('saved_designs_stand_alone');

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

// Generate Legacy PDF
Route::get('order/{orderId}/generatePDF', 'UniformBuilderController@generateLegacy');
Route::get('order/generatePDFbyFOID/{foid}', 'UniformBuilderController@generateLegacyByFOID');

// Display the Order
Route::get('orderitem/{orderId}/{orderItemId}', 'UniformBuilderController@loadOrderItem');
Route::get('order/{orderId}', 'UniformBuilderController@loadOrder');
Route::get('orderbyFOID/{foid}', 'UniformBuilderController@loadOrderbyFOID');

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
Route::group(array('prefix' => 'administration', 'middleware' => 'disablePreventBack'), function() {
    Route::get('custom_artwork_requests', 'Administration\CustomArtworkRequestController@index')->name('indexCustomArtworkRequests');
    Route::get('custom_artwork_requests/processing', 'Administration\CustomArtworkRequestController@getProcessing')->name('getProcessingCustomArtworkRequests');
    Route::get('upload_custom_artwork/{id}', 'Administration\CustomArtworkRequestController@upload')->name('uploadCustomArtworkRequest');

    Route::get('/', ['middleware' => 'adminAccess', 'uses' => 'Administration\AdministrationController@dashboard'])->name('admin_dashboard');

    Route::group(['prefix' => env('ENDPOINT_VERSION','v1-0')], function() {
        Route::get('/', ['middleware' => 'adminAccess', 'uses' => 'Administration\AdministrationController@administrationDashboard'])->name('v1_admin_dashboard');

        Route::group(['middleware' => 'restrictedUserAccess'], function() {

            // Configurator
            Route::get('style_configurator', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@styleConfigurator'])->name('v1_style_configurator');

            Route::get('inksoft_designs/search', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@searchPage'])->name('v1_inksoft_design');
            Route::get('inksoft_designs/{current_page?}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\InksoftDesignsController@index'])->name('inksoft_designs');

            Route::get('colors/{active_brand?}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\ColorsController@index'])->name('v1_colors');
            Route::get('/master_colors', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MasterPagesController@colorsIndex'])->name('v1_master_colors');

            // Colors Sets
            Route::get('colors_sets/{active_brand?}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\ColorsSetsController@index'])->name('v1_color_sets');
            Route::get('colors_set/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\ColorsSetsController@addColorsSetForm'])->name('v1_add_color_set');
            Route::post('colors_set/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\ColorsSetsController@store'])->name('v1_store_color_set');
            Route::post('colors_set/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\ColorsSetsController@store'])->name('v1_update_color_set');
            Route::get('colors_set/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\ColorsSetsController@editColorsSetForm'])->name('v1_edit_color_set');

            Route::get('master_fabrics', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MasterPagesController@fabricsIndex'])->name('v1_master_fabrics');
            Route::get('master_fonts', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MasterPagesController@fontsIndex'])->name('v1_master_fonts');

            //Patterns
            Route::get('master_patterns', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MasterPagesController@patternsIndex'])->name('v1_master_patterns');
            Route::get('patterns/{active_sport?}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PatternsController@index'])->name('v1_patterns');
            Route::get('pattern/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PatternsController@addPatternForm'])->name('v1_add_pattern');
            Route::post('pattern/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PatternsController@store'])->name('v1_store_pattern');
            Route::get('pattern/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PatternsController@editPatternForm'])->name('v1_edit_pattern');
            Route::post('pattern/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PatternsController@store'])->name('v1_update_pattern');

            Route::get('ordersMinified/{from?}/{to?}/{test_order?}', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@ordersMinified'])->name('v1_orders_minified');

            Route::get('style_requests', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MasterPagesController@styleRequestIndex'])->name('v1_style_requests');
            Route::get('style_request/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MasterPagesController@styleRequestAdd'])->name('v1_add_style_requests');

            Route::get('saved_designs/{currentPage?}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\SavedDesignsController@index'])->name('saved_designs');

            //Price Items
            Route::get('/price_templates', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PriceItemTemplatesController@index'])->name('v1_price_templates');
            Route::get('price_items', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PriceItemsController@index'])->name('v1_price_items');

            Route::get('/users', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\UsersController@index'])->name('v1_users');
            Route::get('/account_settings/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\UsersController@accountSettings'])->name('v1_edit_user');
            Route::post('/account_settings/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\UsersController@updateName'])->name('v1_update_user');
            Route::get('/users/password_strength', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\UsersController@passwordStrength'])->name('v1_password_strength');
            Route::get('user/transactions/{id?}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\UsersController@userTransactions'])->name('v1_user_transactions');

            Route::get('mascots/{active_sport?}/{active_category?}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsController@index'])->name('v1_mascots');
            Route::get('mascot/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsController@addMascotForm'])->name('v1_add_mascot');
            Route::post('mascot/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsController@store'])->name('v1_store_mascot');
            Route::get('mascot/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsController@editMascotForm'])->name('v1_edit_mascot');
            Route::post('mascot/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsController@store'])->name('v1_update_mascot');

            /* Materials */
            Route::get('materials/{sport?}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@indexSport'])->name('v1_materials_index');
            Route::get('materials/full', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@indexFull']);
            Route::post('material/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@store'])->name('v1_material_store');
            Route::post('material/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@store'])->name('v1_update_material');
            Route::get('material/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@addMaterialForm'])->name('v1_material_add');
            Route::get('material/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@editMaterialForm'])->name('v1_material_edit');
            Route::get('material/view_material_options/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@getMaterialOptions'])->name('v1_view_material_option');
            Route::get('material/materials_options_setup/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@materialsOptionsSetup'])->name('v1_materials_options_setup');
            Route::get('material/piping/{id}/{page_number}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@editPipingForm'])->name('v1_edit_piping');
            Route::get('material/{id}/pipings', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@pipings'])->name('v1_piping_add');
            Route::get('material/{id}/modify_pattern', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@modifyPattern'])->name('v1_modify_pattern');
            Route::post('material/modify_pattern', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@saveModifyPattern'])->name('v1_save_modify_pattern');
            Route::get('material/{id}/random_feed', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@randomFeed'])->name('v1_random_feed');
            Route::post('material/piping/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@updatePiping'])->name('v1_update_single_piping');
            Route::post('material/updatePipings', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@updatePipings'])->name('v1_update_piping');
            Route::post('material/updateRandomFeed', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@updateRandomFeed'])->name('v1_update_random_feed');
            Route::get('material/materials_options/dropzone/{material_id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@dropZone'])->name('v1_material_options_dropzone');
            Route::post('material/insert_dz_image', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@insertDropzoneImage'])->name('v1_insert_material_image');
            Route::post('material/insert_dz_design_sheet', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@insertDesignSheet'])->name('v1_insert_material_design_sheet');
            Route::get('material/{id}/logo_position', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@logoPosition'])->name('v1_logo_position');
            Route::post('material/updateLogoPosition', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@updateLogoPosition'])->name('v1_update_logo_position');
            Route::get('material/{id}/gradient', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@gradient'])->name('v1_material_gradient');
            Route::post('material/updateGradient', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsController@updateGradient'])->name('v1_update_material_gradient');

            Route::post('material_option/saveUpdates', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsOptionsController@updateMaterialOptions'])->name('v1_update_material_options');
            Route::post('material_option/saveMultiple', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsOptionsController@storeMultiple'])->name('v1_save_material_option');
            Route::post('material_option/saveApplications', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsOptionsController@saveApplications'])->name('v1_save_applications');
            Route::post('material_option/save', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsOptionsController@store'])->name('v1_save_material_option_info');
            Route::post('material_option/saveBoundary', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsOptionsController@saveBoundary'])->name('v1_save_bounding_box');
            Route::get('material_application/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MaterialsOptionsController@getMaterialApplication'])->name('v1_material_application');

            Route::get('analytics', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\AnalyticsController@index'])->name('v1_analytics_index');

            Route::get('mascot_sizes', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotSizesController@index'])->name('v1_mascot_sizes');
            Route::get('application_sizes', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\ApplicationSizesController@index'])->name('v1_application_sizes');
            Route::get('categories', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\UniformCategoriesController@index'])->name('v1_uniform_categories');
            Route::get('hidden_bodies', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\HiddenBodiesController@index'])->name('v1_hidden_bodies');
            Route::get('single_view_applications', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\SingleViewApplicationsController@index'])->name('v1_single_view_applications');
            Route::get('pipings', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PipingsController@index'])->name('v1_pipings');

            Route::get('mascots_categories', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsCategoriesController@index'])->name('v1_mascot_categories');
            Route::get('mascots_groups_categories', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsGroupsCategoriesController@index'])->name('v1_mascots_groups_categories');

            // Block Patterns
            Route::get('block_patterns', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsController@index'])->name('v1_block_patterns');
            Route::get('block_pattern/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsController@editForm'])->name('v1_modify_block_pattern');
            Route::get('block_pattern/add/', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsController@addForm'])->name('v1_add_block_pattern');
            Route::post('block_pattern/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsController@store'])->name('v1_store_block_pattern');
            Route::post('block_pattern/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsController@store'])->name('v1_update_block_pattern');

            Route::get('block_pattern_filters', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsFilterController@index'])->name('v1_block_pattern_filters');
            Route::get('block_pattern_filters/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsFilterController@create'])->name('v1_add_block_pattern_filter');
            Route::get('block_pattern_filters/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsFilterController@edit'])->name('v1_edit_block_pattern_filter');
            Route::post('block_pattern_filters/store', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsFilterController@store'])->name('v1_store_block_pattern_filter');
            Route::patch('block_pattern_filters/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\BlockPatternsFilterController@update'])->name('v1_update_block_pattern_filter');

            // Fonts
            Route::get('fonts', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\FontsController@index'])->name('v1_fonts_index');
            Route::post('font/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\FontsController@store'])->name('v1_store_font');
            Route::post('font/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\FontsController@store'])->name('v1_update_font');
            Route::get('font/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\FontsController@addFontForm'])->name('v1_create_fonts');;
            Route::get('font/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\FontsController@editFontForm'])->name('v1_edit_font');
            Route::get('fonts_minified', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\FontsController@indexMinified']);

            //Tagged Styles
            Route::get('tagged_styles', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\TaggedStylesController@index'])->name('v1_tagged_styles');
            Route::get('tagged_styles/totals', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\TaggedStylesController@totals'])->name('v1_tagged_styles_total');

            // Feedbacks
            Route::get('feedbacks', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\FeedbacksController@index'])->name('v1_feedbacks');
            Route::get('feedback/reply/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\FeedbacksController@reply'])->name('v1_feedback_reply');
            Route::get('feedback/thread/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\FeedbacksController@viewThread'])->name('v1_feedback_thread');

            Route::get('points_of_measures', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PointsOfMeasuresController@index'])->name('v1_point_of_measure');
            Route::get('spec_sheets', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\SpecSheetsController@index'])->name('v1_spec_sheets');
            Route::get('spec_sheet/export_excel/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\SpecSheetsController@exportExcel'])->name('v1_spec_sheet_export');

            // Logo Requests
            Route::get('logo_requests/{currentPage?}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\LogoRequestsController@index'])->name('v1_logo_requests');
            Route::get('upload_logo_request/{logo_request_id}/{logo_index}/{logo_request_user_id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsController@addLogoRequestForm'])->name('v1_add_logo_request');
            Route::post('logo/add', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsController@storeArtwork'])->name('v1_store_logo_request');
            Route::get('upload_existing_logo/{logo_request_id}/{logo_index}/{logo_request_user_id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsController@addExistingLogoForm'])->name('v1_add_existing_logo');
            Route::post('logo/add_existing', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MascotsController@storeExistingLogo'])->name('v1_store_existing_logo');

            // Menu
            Route::get('menus', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MenuController@index'])->name('v1_menus');
            Route::post('menu', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\MenuController@store'])->name('v1_store_new_menu');

            // Random Feed Images
            Route::get('random_feed_images', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\RandomFeedImageController@index'])->name('v1_index_random_feed_image');

            // Pages
            Route::get('pages', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PageController@index'])->name('v1_pages');

            // Page Rules
            Route::get('page_rules', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\PageRuleController@index'])->name('v1_page_rules');

            // QX7 Style Requests
            Route::get('qx7_style_requests', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@index'])->name('v1_qx7_style_requests');
            Route::get('qx7_style_request/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@show'])->name('v1_qx7_style_request');
            Route::get('qx7_style_requests/create_style/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@createStyle'])->name('v1_qx7_create_style');
            Route::get('qx7_style_requests/edit_style/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@editStyle'])->name('v1_qx7_edit_style');
            Route::get('qx7_style_requests/options/dropzone/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@dropZone'])->name('v1_qx7_dropzone');
            Route::get('qx7_style_requests/view_options/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@getOptions'])->name('v1_qx7_style_options');
            Route::get('qx7_style_requests/view_options_setup/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@styleOptionsSetup'])->name('v1_qx7_style_options_setup');
            Route::get('qx7_style_requests/style_application/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@getStyleApplication'])->name('v1_qx7_style_application');
            Route::post('qx7_style_requests/options/saveApplications', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@saveApplications'])->name('v1_qx7_save_style_applications');
            Route::post('qx7_style_requests/bounding_box/import', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@importBoundingBox'])->name('v1_import_bounding_box');
            Route::post('qx7_style_requests/option/save', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@saveOption'])->name('v1_qx7_save_option');
            Route::post('qx7_style_requests/option/update', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@updateOption'])->name('v1_qx7_update_option');
            Route::post('qx7_style_requests/option/saveBoundary', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@saveBoundary'])->name('v1_qx7_save_bounding_box');
            Route::post('qx7_style_requests/option/purgeOption', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@purgeOption'])->name('v1_qx7_cleanup_style');
            Route::get('qx7_style_requests/pipings/{id}', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@pipings'])->name('v1_qx7_pipings');
            Route::post('qx7_style_requests/piping/save', ['middleware' => 'adminAccess', 'uses' => 'AdministrationV2\Qx7StyleRequestController@updatePiping'])->name('v1_qx7_update_piping');
        });
    });

    // Logins
    Route::get('login', 'Administration\AuthenticationController@loginForm');
    Route::post('login', 'Administration\AuthenticationController@administrationLogin');
    Route::get('logout', 'Administration\AuthenticationController@administrationLogout');

    // Admin page
    Route::get('main', ['middleware' => 'adminAccess', 'uses' => 'Administration\AdministrationController@dashboard']);

     // Accents
    Route::get('accent/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\AccentsController@create'])->name('add_new_accent');
    Route::post('accent/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\AccentsController@store']);
    Route::get('accents', ['middleware' => 'adminAccess', 'uses' => 'Administration\AccentsController@index'])->name('accents');
    Route::get('accent/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\AccentsController@editAccentForm'])->name('modify_accent');
    Route::post('accent/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\AccentsController@store']);

    // Users
    Route::get('users', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@index'])->name('users');
    Route::post('user/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@store']);
    Route::post('user/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@store']);
    Route::post('user/update_allowed_pages', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@updateAllowedPages'])->name('update_allowed_pages');
    Route::get('user/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@addUserForm'])->name('add_new_user');
    Route::get('user/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@editUserForm'])->name('modify_user');
    Route::get('account_settings/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@accountSettings']);
    Route::post('account_settings/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@updateName']);
    Route::get('account_settings/change_password/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@changePasswordForm']);
    Route::post('account_settings/change_password', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@changePassword']);
    Route::get('rejected_users' , ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@getRejectedUsers']);
    Route::get('user/orders/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UsersController@userOrders']);

    // Factories
    Route::get('factories', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@index'])->name('factories');
    Route::post('factory/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@store']);
    Route::post('factory/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@store']);
    Route::get('factory/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@addFactoryForm'])->name('add_new_factory');
    Route::get('factory/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FactoriesController@editFactoryForm'])->name('modify_factory');

    // Uniform Categories
    Route::get('categories', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@index'])->name('uniform_categories');
    Route::post('category/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@store']);
    Route::post('category/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@store']);
    Route::get('category/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@addCategoryForm'])->name('add_new_uniform_category');
    Route::get('category/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformCategoriesController@editCategoryForm'])->name('modify_uniform_category');

    // Colors
    Route::get('colors', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@index'])->name('colors');
    Route::get('colors/updateAll', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@updateColors']);
    Route::post('color/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@store']);
    Route::post('color/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@store']);
    Route::get('color/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@addColorForm'])->name('add_new_color');
    Route::get('color/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@editColorForm']);

    // Colors Sets
    Route::get('colors_sets', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsSetsController@index'])->name('colors_sets');
    Route::get('colors_set/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsSetsController@addColorsSetForm'])->name('add_new_colors_set');
    Route::post('colors_set/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsSetsController@store']);
    Route::post('colors_set/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsSetsController@store']);
    Route::get('colors_set/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsSetsController@editColorsSetForm'])->name('edit_colors_set');

    // Mascots
    Route::get('mascots', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@index'])->name('mascots');
    Route::post('mascots_filter', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@indexFiltered']);
    Route::get('mascot/search', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@searchPage'])->name('search_mascots');
    Route::post('mascot/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@store']);
    Route::post('mascot/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@store']);
    Route::get('mascot/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addMascotForm'])->name('add_new_mascot');
    Route::get('mascot/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@editMascotForm'])->name('edit_mascot');
    Route::get('mascots_categories', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@index'])->name('mascots_categories');
    Route::get('mascots_groups_categories', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsGroupsCategoriesController@index'])->name('mascots_groups_categories');
    Route::get('mascots_groups_categories/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsGroupsCategoriesController@addMascotsGroupsCategoryForm'])->name('add_new_mascot_group_category');
    Route::get('mascots_categories/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@addMascotsCategoryForm'])->name('add_new_mascot_category');
    Route::post('mascots_categories/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@store']);
    Route::post('mascots_groups_categories/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsGroupsCategoriesController@store']);
    Route::post('mascots_groups_categories/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsGroupsCategoriesController@store']);
    Route::post('mascots_categories/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@store']);
    Route::get('mascots_categories/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsCategoriesController@editMascotsCategoriesForm']);
    Route::get('mascots_groups_categories/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsGroupsCategoriesController@editMascotsGroupsCategoriesForm']);
    Route::get('upload_artwork/{artwork_request_id}/{artwork_index}/{artwork_user_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addArtworkForm']);
    Route::get('upload_logo_request/{logo_request_id}/{logo_index}/{logo_request_user_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addLogoRequestForm'])->name('upload_logo_request');
    Route::get('upload_existing_artwork/{artwork_request_id}/{artwork_index}/{artwork_user_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addExistingArtworkForm']);
    Route::get('upload_existing_logo/{logo_request_id}/{logo_index}/{logo_request_user_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@addExistingLogoForm']);
    Route::post('artwork/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@storeArtwork']);
    Route::post('artwork/add_existing', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@storeExistingArtwork']);
    Route::post('logo/add_existing', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@storeExistingLogo']);
    Route::post('logo/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotsController@storeArtwork']);

    // Materials
    Route::get('materials', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@index'])->name('materials');
    Route::get('materials/{sport?}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@indexSport']);
    Route::get('materials/full', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@indexFull']);
    Route::post('material/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@store']);
    Route::post('material/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@store']);
    Route::get('material/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@addMaterialForm'])->name('add_new_material');
    Route::get('material/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@editMaterialForm'])->name('edit_material');
    Route::get('material/view_material_options/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@getMaterialOptions'])->name('view_material_options');
    Route::get('material/materials_options_setup/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@materialsOptionsSetup'])->name('material_options_setup');
    Route::get('material/piping/{id}/{page_number}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@editPipingForm']);
    Route::get('material/{id}/pipings', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@pipings'])->name('pipings');
    Route::get('material/{id}/random_feed', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@randomFeed'])->name('random_feed');
    Route::post('material/piping/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@updatePiping']);
    Route::post('material/updatePipings', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@updatePipings']);
    Route::post('material/updateRandomFeed', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@updateRandomFeed']);
    Route::get('material/materials_options/dropzone/{material_id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@dropZone'])->name('dropzone');
    Route::post('material/insert_dz_image', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@insertDropzoneImage']);
    Route::post('material/insert_dz_design_sheet', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@insertDesignSheet']);
    Route::get('material/single_page', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@singlePage'])->name('material_single_page');
    Route::get('material/{id}/logo_position', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@logoPosition'])->name('logo_position');
    Route::post('material/updateLogoPosition', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@updateLogoPosition'])->name('update_logo_position');
    Route::get('material/{id}/gradient', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@gradient'])->name('gradient');
    Route::post('material/updateGradient', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@updateGradient'])->name('update_gradient');

    // Materials Options
    Route::post('material_option/save', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@store']);
    Route::post('material_option/saveApplications', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@saveApplications']);
    Route::post('material_option/saveBoundary', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@saveBoundary']);
    Route::post('material_option/saveMultiple', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@storeMultiple']);
    Route::post('material_option/purgeColor', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@purgeColor']);
    Route::post('material_option/saveUpdates', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@updateMaterialOptions']);

    // Messages
    Route::get('messages', ['middleware' => 'adminAccess', 'uses' => 'Administration\MessagesController@getUserMessages']);
    Route::get('message/compose', ['middleware' => 'adminAccess', 'uses' => 'Administration\MessagesController@composeForm']);

    // Base Models
    Route::get('models', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@index']);
    Route::post('model/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@store']);
    Route::post('model/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@store']);
    Route::get('model/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@addModelForm']);
    Route::get('model/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\BaseModelsController@editModelForm']);

    //Patterns
    Route::get('patterns', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@index'])->name('patterns');
    Route::post('pattern/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@store']);
    Route::post('pattern/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@store']);
    Route::get('pattern/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@addPatternForm'])->name('add_new_patterns');
    Route::get('pattern/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\PatternsController@editPatternForm'])->name('modify_pattern');

    // Placeholders
    Route::get('placeholders', ['middleware' => 'adminAccess', 'uses' => 'Administration\PlaceholdersController@index'])->name('placeholders');
    Route::get('placeholder/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PlaceholdersController@addPlaceholderForm'])->name('add_new_place_holder');
    Route::post('placeholder/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PlaceholdersController@store']);

    // Price Items
    Route::get('price_items', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemsController@index'])->name('price_items');
    Route::get('price_item/materials', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemsController@materialsTable'])->name('uniforms_list_view');
    Route::get('price_items/manual_update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemsController@manualUpdate'])->name('manual_price_items_update');
    Route::get('price_item/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemsController@addPriceItem'])->name('add_new_price_items');
    Route::post('price_item', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemsController@store']);


    // Preferences
    Route::get('preferences', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@index'])->name('preferences');
    Route::get('preference/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@addPreferenceForm'])->name('add_new_preference');
    Route::post('preference/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@store']);
    Route::get('preference/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@editPreferenceForm'])->name('edit_preference');
    Route::post('preference/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PreferencesController@store']);

    // Fonts
    Route::get('fonts', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@index'])->name('fonts');
    Route::post('font/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@store']);
    Route::post('font/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@store']);
    Route::get('font/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@addFontForm'])->name('add_new_font');
    Route::get('font/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@editFontForm'])->name('modify_font');
    Route::get('fonts_minified', ['middleware' => 'adminAccess', 'uses' => 'Administration\FontsController@indexMinified']);

    // Gradients
    Route::get('gradients', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@index'])->name('gradients');
    Route::post('gradient/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@store']);
    Route::post('gradient/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@store']);
    Route::get('gradient/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@addGradientForm'])->name('add_new_gradient');
    Route::get('gradient/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\GradientsController@editGradientForm'])->name('edit_gradient');

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
    Route::get('fabrics', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@index'])->name('fabrics');
    Route::post('fabric/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@store']);
    Route::post('fabric/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@store']);
    Route::get('fabric/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@addForm'])->name('add_new_fabric');
    Route::get('fabric/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FabricsController@editForm'])->name('modify_fabric');

    // Uniform Design Sets
    Route::get('design_sets', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@index'])->name('uniform_design_sets');
    Route::post('design_set/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@store']);
    Route::post('design_set/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@store']);
    Route::get('design_set/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@addForm'])->name('add_new_design_set');
    Route::get('design_set/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UniformDesignSetsController@editForm']);

    // Linings
    Route::get('linings', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@index'])->name('linings');
    Route::post('lining/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@store']);
    Route::post('lining/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@store']);
    Route::get('lining/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@addForm'])->name('add_new_lining');
    Route::get('lining/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\LiningsController@editForm'])->name('modify_lining');

     // Splash
    Route::get('splash_images', ['middleware' => 'adminAccess', 'uses' => 'Administration\SplashImagesController@index'])->name('splash_image');
    Route::post('splash_image/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\SplashImagesController@store']);
    Route::get('splash_image/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\SplashImagesController@create'])->name('add_new_splash_image');
    Route::get('splash_image/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\SplashImagesController@editSplashImageForm'])->name('edit_splash_image');
    Route::post('splash_image/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\SplashImagesController@store']);

    // Orders
    Route::get('orders', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@index'])->name('pending_orders');
    Route::get('orders/test_orders', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@testOrders'])->name('test_orders');
    Route::get('orders/sent_orders', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@indexSentOrders'])->name('sent_orders');
    Route::get('orders/search_order', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@indexSearchOrder'])->name('search_sent_order');
    Route::post('order/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@store']);
    Route::post('order/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@store']);
    Route::get('order/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@addForm']);
    Route::get('order/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@editForm']);
    Route::get('order_search/{foid}', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@orderSearch'])->name('search_order_resultnames');
    Route::get('canvas', ['middleware' => 'adminAccess', 'uses' => 'Administration\CanvasController@index']);
    Route::get('canvas/texturing-guide', ['middleware' => 'adminAccess', 'uses' => 'Administration\CanvasController@texturing_guide']);

    // Block Patterns
    Route::get('block_patterns', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@index'])->name('block_patterns');
    Route::get('block_pattern/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@addForm'])->name('add_new_block_pattern');
    Route::post('block_pattern/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@store']);
    Route::get('block_pattern/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@editForm'])->name('modify_block_pattern');
    Route::post('block_pattern/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\BlockPatternsController@store']);

    // Feature Flags
    Route::get('feature_flags', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@index'])->name('feature_flags');
    Route::get('feature_flag/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@addForm'])->name('add_new_feature_flag');
    Route::post('feature_flag/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@store']);
    Route::get('feature_flag/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@editForm'])->name('modify_feature_flag');
    Route::post('feature_flag/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeatureFlagsController@store']);

    // Helpers
    Route::get('helpers', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@index'])->name('helpers');
    Route::get('helper/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@addForm'])->name('add_new_helper');
    Route::post('helper/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@store']);
    Route::get('helper/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@editForm'])->name('edit_helper');
    Route::post('helper/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\HelpersController@store']);

    // NewsLetters
    Route::get('news_letters', ['middleware' => 'adminAccess', 'uses' => 'Administration\NewsLettersController@index'])->name('newsletters');

    // Test
    Route::get('test/create', ['middleware' => 'adminAccess', 'uses' => 'Administration\TestsController@uploadFileForm']);
    Route::post('test/uploadFile', ['middleware' => 'adminAccess', 'uses' => 'Administration\TestsController@store']);

    // Materials Fabric
    Route::get('materials_fabrics', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsFabricsController@index'])->name('fabrics_factory');
    Route::post('materials_fabric/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsFabricsController@store']);
    Route::get('materials_fabric/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsFabricsController@create'])->name('add_new_fabrics_factory');
    Route::get('materials_fabric/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsFabricsController@editMaterialFabricForm'])->name('modify_fabric_factory');
    Route::post('materials_fabric/delete', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsFabricsController@delete']);
    Route::get('materials_fabric/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsFabricsController@show']);
    Route::post('materials_fabric/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsFabricsController@store']);

    // Artworks
    Route::get('artwork_requests', ['middleware' => 'adminAccess', 'uses' => 'Administration\ArtworksController@index'])->name('new_artwork_requests');
    Route::get('artwork_requests/processing', ['middleware' => 'adminAccess', 'uses' => 'Administration\ArtworksController@processing'])->name('processing_artwork_requests');

    // Logo Requests
    Route::get('logo_requests', ['middleware' => 'adminAccess', 'uses' => 'Administration\LogoRequestsController@index'])->name('logo_requests');

    // Feedbacks
    Route::get('feedbacks', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeedbacksController@index'])->name('feedbacks');
    Route::get('feedback/reply/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeedbacksController@reply'])->name('reply_to_feedback');
    Route::get('feedback/thread/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\FeedbacksController@viewThread']);

    // Mockup set
    Route::get('mockup_sets', ['middleware' => 'adminAccess', 'uses' => 'Administration\MockupSetsController@index'])->name('mockup_sets');
    Route::get('mockup_set/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MockupSetsController@show'])->name('edit_mockup_set');

    // Price Item Templates
    Route::get('price_item_templates', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemTemplatesController@index'])->name('price_item_templates');
    Route::get('price_item_template/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemTemplatesController@addForm'])->name('add_new_price_item_template');
    Route::post('price_item_template', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemTemplatesController@store']);
    Route::get('price_item_template/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemTemplatesController@show']);
    Route::get('price_item_template/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemTemplatesController@editForm'])->name('modify_price_item_template');
    Route::post('price_item_template/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PriceItemTemplatesController@store']);

    // Saved Designs
    Route::get('saved_designs', ['middleware' => 'adminAccess', 'uses' => 'Administration\SavedDesignsController@index']);

    // Tailsweeps
    Route::get('tailsweeps', ['middleware' => 'adminAccess', 'uses' => 'Administration\TailsweepsController@index'])->name('index_tailsweeps');
    Route::get('tailsweep/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\TailsweepsController@create']);
    Route::post('tailsweep/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\TailsweepsController@store']);
    Route::get('tailsweep/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\TailsweepsController@editTailsweepForm']);
    Route::post('tailsweep/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\TailsweepsController@store']);

    // Mascot sizes
    Route::get('mascot_sizes', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotSizesController@index'])->name('mascot_sizes');
    Route::get('mascot_size/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotSizesController@addMascotSizeForm'])->name('add_new_mascot_size');
    Route::post('mascot_size/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotSizesController@store']);
    Route::get('mascot_size/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotSizesController@editMascotSizeForm'])->name('edit_mascot_size');
    Route::post('mascot_size/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MascotSizesController@store']);

    // Applications sizes
    Route::get('application_sizes', ['middleware' => 'adminAccess', 'uses' => 'Administration\ApplicationSizesController@index'])->name('application_sizes');
    Route::get('application_size/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ApplicationSizesController@addForm'])->name('add_new_application_size');
    Route::post('application_size/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ApplicationSizesController@store']);
    Route::get('application_size/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\ApplicationSizesController@editForm'])->name('modify_application_size');
    Route::post('application_size/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\ApplicationSizesController@store']);

    // Parts Aliases
    Route::get('parts_aliases', ['middleware' => 'adminAccess', 'uses' => 'Administration\PartsAliasesController@index'])->name('parts_aliases');
    Route::get('parts_aliases/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PartsAliasesController@addForm'])->name('add_new_parts_aliases');
    Route::post('parts_aliases/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PartsAliasesController@store']);
    Route::post('parts_aliases/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PartsAliasesController@store']);
    Route::get('parts_aliases/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\PartsAliasesController@edit'])->name('edit_parts_aliases');

    //Sales Reps
    Route::get('sales_reps/add' , ['middleware' => 'adminAccess', 'uses' => 'Administration\SalesRepresentativesController@create'])->name('sales_representative_registration');
    Route::post('sales_reps/add' , ['middleware' => 'adminAccess', 'uses' => 'Administration\SalesRepresentativesController@store']);
    Route::get('sales_reps' , ['middleware' => 'adminAccess', 'uses' => 'Administration\SalesRepresentativesController@index'])->name('sales_representatives');
    Route::get('sales_reps/edit/{id}' , ['middleware' => 'adminAccess', 'uses' => 'Administration\SalesRepresentativesController@edit'])->name('edit_sales_representative_profile');
    Route::post('sales_reps/update' , ['middleware' => 'adminAccess', 'uses' => 'Administration\SalesRepresentativesController@store']);

    //Cuts Links
    Route::get('cuts_links/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutsLinksController@create'])->name('add_new_cuts_links');
    Route::post('cuts_links/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutsLinksController@store']);
    Route::get('cuts_links', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutsLinksController@index'])->name('cuts_links');
    Route::get('cuts_links/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutsLinksController@edit']);
    Route::post('cuts_links/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\CutsLinksController@store']);

    //Dealers
    Route::get('dealers/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@create'])->name('add_new_dealer');
    Route::post('dealers/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@store']);
    Route::get('dealers', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@index'])->name('dealers');
    Route::get('dealers/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@edit'])->name('edit_dealer');
    Route::post('dealers/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\DealersController@store']);

    // Style Requests
    Route::get('style_requests', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleRequestsController@index'])->name('style_requests');
    Route::get('approved_style_requests', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleRequestsController@approvedIndex'])->name('approved_style_requests');
    Route::get('styles_on_customizer', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleRequestsController@stylesOnCustomizer'])->name('styles_on_customizer');
    Route::get('style_viewer', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleRequestsController@styleViewer'])->name('style_viewer');
    Route::get('styles_stats', ['middleware' => 'adminAccess', 'uses' => 'Administration\StyleRequestsController@stylesStats'])->name('styles_stats');

    //Item Sizes
    Route::get('item_sizes', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@index'])->name('item_sizes');
    Route::get('item_size/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@create'])->name('add_new_item_size');
    Route::post('item_size/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@store']);
    Route::get('item_size/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@edit'])->name('modify_item_size');
    Route::post('item_size/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\ItemSizesController@store']);

    //Inksoft Designs
    Route::get('inksoft_designs', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@index'])->name('inksoft_designs');
    Route::get('inksoft_design/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@create'])->name('add_new_inksoft_design');
    Route::post('inksoft_design/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@store']);
    Route::get('inksoft_design/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\InksoftDesignsController@edit'])->name('modify_inksoft_design');
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

    //Single View Applications
    Route::get('single_view_applications', ['middleware' => 'adminAccess', 'uses' => 'Administration\SingleViewApplicationsController@index'])->name('single_view_applications');
    Route::get('single_view_applications/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\SingleViewApplicationsController@create'])->name('add_new_category_with_single_application');
    Route::get('single_view_applications/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\SingleViewApplicationsController@edit'])->name('modify_category_with_single_application');
    Route::post('single_view_applications/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\SingleViewApplicationsController@store']);
    Route::post('single_view_applications/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\SingleViewApplicationsController@store']);

    //Reversible Groups
    Route::get('reversible_groups', ['middleware' => 'adminAccess', 'uses' => 'Administration\ReversibleGroupsController@index'])->name('reversible_groups');
    Route::get('reversible_groups/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ReversibleGroupsController@create'])->name('add_new_reverible_groups');
    Route::get('reversible_groups/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\ReversibleGroupsController@edit'])->name('modify_reversible_group');
    Route::post('reversible_groups/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ReversibleGroupsController@store']);
    Route::post('reversible_groups/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\ReversibleGroupsController@store']);

    //Table Total Records
    Route::get('total_records/{table?}', ['middleware' => 'adminAccess', 'uses' => 'Administration\TotalRecordsController@index'])->name('total_records');

    //Tagged Styles
    Route::get('tagged_styles', ['middleware' => 'adminAccess', 'uses' => 'Administration\TaggedStylesController@index'])->name('tagged_styles');
    Route::get('tagged_styles/totals', ['middleware' => 'adminAccess', 'uses' => 'Administration\TaggedStylesController@totals'])->name('tagged_styles_total');

    //User Pairings
    Route::get('user_pairings', ['middleware' => 'adminAccess', 'uses' => 'Administration\UserPairingsController@index'])->name('user_pairings');
    Route::get('user_pairings/items/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\UserPairingsController@getPairingItemsByID'])->name('view_pairing_items');

    //Branding
    Route::get('brandings', ['middleware' => 'adminAccess', 'uses' => 'Administration\BrandingsController@index'])->name('brands');
    Route::post('brandings/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\BrandingsController@store']);
    Route::post('brandings/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\BrandingsController@store']);
    Route::get('brandings/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\BrandingsController@create'])->name('add_new_brand');
    Route::get('brandings/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\BrandingsController@edit'])->name('edit_brand');

    Route::group(['prefix' => 'master_pages' ], function() {
        Route::get('fonts', ['middleware' => 'adminAccess', 'uses' => 'Administration\MasterFontsController@index']);
    });

    // User Restriction
    Route::get('user_restrictions', ['uses' => 'Administration\UserRestrictionController@index']);

    // Pages
    Route::get('pages', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageController@index'])->name('pages');
    Route::get('page/{id}/edit', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageController@edit'])->name('edit_page');
    Route::get('page/create', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageController@create'])->name('add_new_page');
    Route::post('page/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageController@store'])->name('store_new_page');
    Route::patch('page/{id}/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageController@update'])->name('update_page');
    Route::get('page/{id}/delete', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageController@delete'])->name('delete_page');
    Route::get('pages/v1-0', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageController@getV1Pages'])->name('get_v1_pages');

    // Page Rules
    Route::get('page_rules', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageRuleController@index'])->name('page_rules');
    Route::get('page_rules/{id}/edit', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageRuleController@edit'])->name('edit_page_rule');
    Route::get('page_rule/create', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageRuleController@create'])->name('add_new_page_rule');
    Route::post('page_rule/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageRuleController@store'])->name('store_new_page_rule');
    Route::patch('page_rule/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageRuleController@update'])->name('update_page_rule');
    Route::get('page_rule{id}/delete', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageRuleController@delete'])->name('delete_page_rule');
    Route::get('page_rule/{type}/{role}', ['middleware' => 'adminAccess', 'uses' => 'Administration\PageRuleController@getPageRuleByTypeAndRole'])->name('get_page_rule_by_type_and_role');

    // Roles
    Route::get('roles/get_available_admin_roles_in_page_rules', 'Administration\RoleController@getAvailableAdminRolesForPageRules')->name('get_available_admin_roles_in_page_rules');
    Route::get('roles/get_available_normal_roles_in_page_rules', 'Administration\RoleController@getAvailableNormalRolesForPageRules')->name('get_available_normal_roles_in_page_rules');

    Route::get('menus', ['middleware' => 'adminAccess', 'uses' => 'Administration\MenuController@index'])->name('menus');
    Route::post('menu', ['middleware' => 'adminAccess', 'uses' => 'Administration\MenuController@store'])->name('store_new_menu');
    Route::get('menu/create', ['middleware' => 'adminAccess', 'uses' => 'Administration\MenuController@create'])->name('add_new_menu');
    Route::get('menus/{id}/edit', ['middleware' => 'adminAccess', 'uses' => 'Administration\MenuController@edit'])->name('edit_menu');
    Route::patch('menu/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MenuController@update'])->name('update_menu');
    Route::get('menus/{id}/delete', ['middleware' => 'adminAccess', 'uses' => 'Administration\MenuController@delete'])->name('delete_menu');

    // Analytics
    Route::get('analytics/{startDate?}/{endDate?}', ['middleware' => 'adminAccess', 'uses' => 'Administration\AnalyticsController@index'])->name('analytics');
});

Route::get('/messages', 'UniformBuilderController@myMessages');

Route::get('uploadImageForm', 'UploadImageController@uploadImageForm');
Route::post('uploadImage', 'UploadImageController@upload');
Route::post('/fileUpload', 'UniformBuilderController@fileUpload');
Route::post('mobile_notification', 'MobileNotification\MobileNotificationController@store');

# Additional Routes
include_once(dirname(__FILE__) . '/../../routes/web.php');
