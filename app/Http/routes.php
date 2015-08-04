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
    Route::get('/', 'Administration\AdministrationController@index');

    // Login
    Route::get('login', 'Administration\AuthenticationController@loginForm');
    Route::post('login', 'Administration\AuthenticationController@login');
    Route::get('logout', 'Administration\AuthenticationController@logout');

    // Uniform Categories
    Route::get('categories', 'Administration\UniformCategoriesController@index');

    // Colors
    Route::get('colors', 'Administration\ColorsController@index');
    Route::post('color/add', 'Administration\ColorsController@store');
    Route::post('color/update', 'Administration\ColorsController@store');
    Route::get('addColorForm', 'Administration\ColorsController@addColorForm');
    Route::get('editColorForm/{id}', 'Administration\ColorsController@editColorForm');

    // Materials
    Route::get('materials', 'Administration\MaterialsController@index');
    Route::post('material', 'Administration\MaterialsController@store');
    Route::get('addMaterialForm', 'Administration\MaterialsController@addMaterialForm');

    // TODO
    Route::get('factories', function(){ return view('administration.oops'); });
    Route::get('models', function(){ return view('administration.oops'); });
    Route::get('jerseys', function(){ return view('administration.oops'); });
    Route::get('necks', function(){ return view('administration.oops'); });
    Route::get('sleeves', function(){ return view('administration.oops'); });
    Route::get('pants', function(){ return view('administration.oops'); });
    Route::get('skus', function(){ return view('administration.oops'); });
    Route::get('orders', function(){ return view('administration.oops'); });
    Route::get('users', function(){ return view('administration.oops'); });
    Route::get('accountSettings', function(){ return view('administration.oops'); });
});

Route::get('uniform-builder', 'UniformBuilderController@index');

Route::get('uploadImageForm', 'UploadImageController@uploadImageForm');
Route::post('uploadImage', 'UploadImageController@upload');
