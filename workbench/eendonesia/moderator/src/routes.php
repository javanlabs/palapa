<?php

function prefixedNames($prefix) {
    return [
        'index'   => $prefix . '.index',
        'create'  => $prefix . '.create',
        'store'   => $prefix . '.store',
        'show'    => $prefix . '.show',
        'edit'    => $prefix . '.edit',
        'update'  => $prefix . '.update',
        'destroy' => $prefix . '.destroy'
    ];
};

Route::group(['namespace' => 'Eendonesia\Moderator\Controllers', 'prefix' => Config::get('moderator::base_uri')], function()
{
    Route::group(['middleware' => ['auth']], function()
    {
        Route::resource('groups', 'GroupsController', ['names' => prefixedNames('moderator.groups')]);
        Route::resource('resources', 'ResourcesController', ['names' => prefixedNames('moderator.resources')]);
        Route::resource('permissions', 'PermissionsController', ['names' => prefixedNames('moderator.permissions')]);
    });
});
