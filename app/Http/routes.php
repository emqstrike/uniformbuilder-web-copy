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
    // Login
    Route::get('/auth/login', 'AuthenticationController@loginForm');
    Route::get('/auth/register', 'AuthenticationController@registerForm');

    // // Users
    // Route::get('users', 'UserController@users');
    // Route::get('user', 'UserController@index');
    // Route::get('user/{id}', 'UserController@show');
    // Route::post('user', 'UserController@store');

    // // Uniform Categories
    // Route::get('categories', 'UniformCategoriesController@categories');
    // Route::get('category', 'UniformCategoriesController@index');
    // Route::get('category/{id}', 'UniformCategoriesController@show');
});

