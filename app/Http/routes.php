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

    // Colors
    Route::get('colors', 'Administration\AdministrationController@colors');

    // Textures
    Route::get('textures', 'Administration\TexturesController@index');
    Route::post('texture', 'Administration\TexturesController@createTexture');
    Route::get('addTextureForm', 'Administration\TexturesController@addTextureForm');
    Route::get('texture/delete/{id}', 'Administration\TexturesController@delete');
});

