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

Route::get('uniformbuilder', 'UniformBuilderController@index');

// Administration Routes
Route::group(array('prefix' => 'administration'), function() {
    Route::get('/',  function(){ return view('administration.oops'); });

    // Login
    Route::get('login', 'Administration\AuthenticationController@loginForm');
    Route::post('login', 'Administration\AuthenticationController@administrationLogin');
    Route::get('logout', 'Administration\AuthenticationController@logout');

    // Admin page
    Route::get('main', 'Administration\AuthenticationController@main');

    // Users
    Route::get('users', 'Administration\UsersController@index');
    Route::post('user/add', 'Administration\UsersController@store');
    Route::post('user/update', 'Administration\UsersController@store');
    Route::get('user/add', 'Administration\UsersController@addUserForm');
    Route::get('user/edit/{id}', 'Administration\UsersController@editUserForm');

    Route::get('account_settings/{id}', 'Administration\UsersController@accountSettings');
    Route::post('account_settings/update', 'Administration\UsersController@store');

    Route::get('account_settings/change_password/{id}', 'Administration\UsersController@changePasswordForm');
    Route::post('account_settings/change_password', 'Administration\UsersController@changePassword');

    // Uniform Categories
    Route::get('categories', 'Administration\UniformCategoriesController@index');
    Route::post('category/add', 'Administration\UniformCategoriesController@store');
    Route::post('category/update', 'Administration\UniformCategoriesController@store');
    Route::get('category/add', 'Administration\UniformCategoriesController@addCategoryForm');
    Route::get('category/edit/{id}', 'Administration\UniformCategoriesController@editCategoryForm');

    // Colors
    Route::get('colors', 'Administration\ColorsController@index');
    Route::post('color/add', 'Administration\ColorsController@store');
    Route::post('color/update', 'Administration\ColorsController@store');
    Route::get('color/add', 'Administration\ColorsController@addColorForm');
    Route::get('color/edit/{id}', 'Administration\ColorsController@editColorForm');

    // Materials
    Route::get('materials', 'Administration\MaterialsController@index');
    Route::post('material/add', 'Administration\MaterialsController@store');
    Route::post('material/update', 'Administration\MaterialsController@store');
    Route::get('material/add', 'Administration\MaterialsController@addMaterialForm');
    Route::get('material/edit/{id}', 'Administration\MaterialsController@editMaterialForm');

    // Materials Options
    Route::post('material_option/add', 'Administration\MaterialsOptionsController@store');
    Route::post('material_option/update', 'Administration\MaterialsOptionsController@store');

    // Base Models
    Route::get('models', 'Administration\BaseModelsController@index');
    Route::post('model/add', 'Administration\BaseModelsController@store');
    Route::post('model/update', 'Administration\BaseModelsController@store');
    Route::get('model/add', 'Administration\BaseModelsController@addModelForm');
    Route::get('model/edit/{id}', 'Administration\BaseModelsController@editModelForm');

    // Patterns
    Route::get('patterns', 'Administration\PatternsController@index');
    Route::post('pattern/add', 'Administration\PatternsController@store');
    Route::post('pattern/update', 'Administration\PatternsController@store');
    Route::get('pattern/add', 'Administration\PatternsController@addPatternForm');
    Route::get('pattern/edit/{id}', 'Administration\PatternsController@editPatternForm');

    // Fonts
    Route::get('fonts', 'Administration\FontsController@index');
    Route::post('font/add', 'Administration\FontsController@store');
    Route::post('font/update', 'Administration\FontsController@store');
    Route::get('font/add', 'Administration\FontsController@addFontForm');
    Route::get('font/edit/{id}', 'Administration\FontsController@editFontForm');

    // Gradients
    Route::get('gradients', 'Administration\GradientsController@index');
    Route::post('gradient/add', 'Administration\GradientsController@store');
    Route::post('gradient/update', 'Administration\GradientsController@store');
    Route::get('gradient/add', 'Administration\GradientsController@addGradientForm');
    Route::get('gradient/edit/{id}', 'Administration\GradientsController@editGradientForm');

    // Cut Styles
    Route::get('cuts/neck-styles', 'Administration\CutStylesController@neckStyles');
    Route::get('cuts/sleeve-styles', 'Administration\CutStylesController@sleeveStyles');
    Route::get('cuts/waist-cuts', 'Administration\CutStylesController@waistCuts');
    Route::get('cuts/pant-cuts', 'Administration\CutStylesController@pantCuts');
    Route::get('cuts/sleeve-panels', 'Administration\CutStylesController@sleevePanels');
    Route::get('cuts/shoulder-panels', 'Administration\CutStylesController@shoulderPanels');
    Route::get('cuts/underarm-panels', 'Administration\CutStylesController@underarmPanels');
    Route::post('cut/add', 'Administration\CutStylesController@store');
    Route::post('cut/update', 'Administration\CutStylesController@store');
    Route::get('cut/add/{type}', 'Administration\CutStylesController@addForm');
    Route::get('cut/edit/{id}', 'Administration\CutStylesController@editForm');

    // Fabrics
    Route::get('fabrics', 'Administration\FabricsController@index');
    Route::post('fabric/add', 'Administration\FabricsController@store');
    Route::post('fabric/update', 'Administration\FabricsController@store');
    Route::get('fabric/add/', 'Administration\FabricsController@addForm');
    Route::get('fabric/edit/{id}', 'Administration\FabricsController@editForm');

    Route::get('canvas', 'Administration\CanvasController@index');
    Route::get('canvas/texturing-guide', 'Administration\CanvasController@texturing_guide');

    // TODO
    Route::get('factories', function(){ return view('administration.oops'); });
    Route::get('waists', function(){ return view('administration.oops'); });
    Route::get('necks', function(){ return view('administration.oops'); });
    Route::get('sleeves', function(){ return view('administration.oops'); });
    Route::get('pants', function(){ return view('administration.oops'); });
    Route::get('skus', function(){ return view('administration.oops'); });
    Route::get('orders', function(){ return view('administration.oops'); });
    Route::get('accountSettings', function(){ return view('administration.oops'); });

});

Route::get('uniform-builder', 'UniformBuilderController@index');
Route::get('uniform-builder-index', 'UniformBuilderController@uniform_builder_index');


Route::get('uploadImageForm', 'UploadImageController@uploadImageForm');
Route::post('uploadImage', 'UploadImageController@upload');
