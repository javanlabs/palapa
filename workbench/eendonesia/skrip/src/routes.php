<?php

Route::group(['namespace' => 'Eendonesia\Skrip\Controllers', 'prefix' => Config::get('skrip::prefix')], function()
{
    Route::group(['middleware' => ['auth']], function()
    {
        Route::resource('posts', 'PostsController');
    });
});
