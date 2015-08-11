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

    // Users
    Route::get('users', 'Administration\UsersController@index');
    Route::post('user/add', 'Administration\UsersController@store');
    Route::post('user/update', 'Administration\UsersController@store');
    Route::get('user/add', 'Administration\UsersController@addUserForm');
    Route::get('user/edit/{id}', 'Administration\UsersController@editUserForm');

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
    Route::get('pattern/add', 'Administration\PatternsController@addpatternForm');
    Route::get('pattern/edit/{id}', 'Administration\PatternsController@editModelForm');

    // TODO
    Route::get('factories', function(){ return view('administration.oops'); });
    Route::get('jerseys', function(){ return view('administration.oops'); });
    Route::get('necks', function(){ return view('administration.oops'); });
    Route::get('sleeves', function(){ return view('administration.oops'); });
    Route::get('pants', function(){ return view('administration.oops'); });
    Route::get('skus', function(){ return view('administration.oops'); });
    Route::get('orders', function(){ return view('administration.oops'); });
    Route::get('accountSettings', function(){ return view('administration.oops'); });
});

Route::get('uniform-builder', 'UniformBuilderController@index');

Route::get('uploadImageForm', 'UploadImageController@uploadImageForm');
Route::post('uploadImage', 'UploadImageController@upload');
