<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Categories
Route::prefix('categories')->group(function () {
    Route::get('/', 'Api\CategoryController@index');
    Route::get('{category}', 'Api\CategoryController@show');
    Route::post('/', 'Api\CategoryController@store');
    Route::put('{category}', 'Api\CategoryController@update');
    Route::delete('{category}', 'Api\CategoryController@destroy');
});

// Products
Route::prefix('category')->group(function () {
    Route::get('{category}/products', 'Api\ProductController@index');
    Route::post('{category}/products', 'Api\ProductController@store');
});
Route::prefix('products')->group(function () {
    Route::get('{product}', 'Api\ProductController@show');
    Route::put('{product}', 'Api\ProductController@update');
    Route::delete('{product}', 'Api\ProductController@destroy');
});
