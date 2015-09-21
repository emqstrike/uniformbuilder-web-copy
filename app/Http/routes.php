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
    return view('welcome');
});

// Administration Routes
Route::group(array('prefix' => 'administration'), function() {
    
    Route::get('/',  function(){ return view('administration.oops'); });

    // Login
    Route::get('login', 'Administration\AuthenticationController@loginForm');
    Route::post('login', 'Administration\AuthenticationController@administrationLogin');
    Route::get('logout', 'Administration\AuthenticationController@logout');

    // Admin page
    Route::get('main', ['middleware' => 'adminAccess', 'uses' => 'Administration\AuthenticationController@main']);

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
    Route::post('color/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@store']);
    Route::post('color/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@store']);
    Route::get('color/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@addColorForm']);
    Route::get('color/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\ColorsController@editColorForm']);

    // Materials
    Route::get('materials', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@index']);
    Route::post('material/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@store']);
    Route::post('material/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@store']);
    Route::get('material/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@addMaterialForm']);
    Route::get('material/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsController@editMaterialForm']);

    // Materials Options
    Route::post('material_option/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@store']);
    Route::post('material_option/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\MaterialsOptionsController@store']);

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

    // Linings
    Route::get('orders', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@index']);
    Route::post('order/add', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@store']);
    Route::post('order/update', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@store']);
    Route::get('order/add/', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@addForm']);
    Route::get('order/edit/{id}', ['middleware' => 'adminAccess', 'uses' => 'Administration\OrdersController@editForm']);

    Route::get('canvas', ['middleware' => 'adminAccess', 'uses' => 'Administration\CanvasController@index']);
    Route::get('canvas/texturing-guide', ['middleware' => 'adminAccess', 'uses' => 'Administration\CanvasController@texturing_guide']);
});

Route::get('uniform-builder-index', 'UniformBuilderController@index');

Route::get('uploadImageForm', 'UploadImageController@uploadImageForm');
Route::post('uploadImage', 'UploadImageController@upload');
