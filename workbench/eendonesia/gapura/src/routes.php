<?php

Route::group(['namespace' => 'Eendonesia\Gapura\Controllers', 'prefix' => Config::get('gapura::base_uri')], function()
{
    Route::group(['middleware' => ['guest']], function()
    {
        Route::get('login', ['as' => 'gapura.login', 'uses' => 'GapuraController@getLogin']);
        Route::post('login', ['as' => 'gapura.login', 'uses' => 'GapuraController@postLogin']);
        Route::get('register', ['as' => 'gapura.register', 'uses' => 'GapuraController@getRegister']);
        Route::post('register', ['as' => 'gapura.register', 'uses' => 'GapuraController@postRegister']);
    });

    Route::group(['middleware' => ['auth']], function()
    {
        Route::get('logout', ['as' => 'gapura.logout', 'uses' => 'GapuraController@getLogout']);
        Route::get('home', ['as' => 'gapura.home', 'uses' => 'GapuraController@getHome']);
    });
});
