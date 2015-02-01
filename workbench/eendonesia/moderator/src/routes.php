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
        Route::resource('users', 'UsersController', ['names' => prefixedNames('moderator.users')]);
        Route::get('users/{id}/reset-password', ['as' => 'moderator.users.reset_password', 'uses' => 'UsersController@resetPassword']);

        Route::resource('groups', 'GroupsController', ['names' => prefixedNames('moderator.groups')]);
        Route::resource('resources', 'ResourcesController', ['names' => prefixedNames('moderator.resources')]);

        Route::get('roles/{id?}', ['as' => 'moderator.roles.index', 'uses' => 'RolesController@index']);
        Route::post('roles/assign', ['as' => 'moderator.roles.assign', 'uses' => 'RolesController@assign']);

        Route::get('permissions/{id?}', ['as' => 'moderator.permissions.index', 'uses' => 'PermissionsController@index']);
        Route::post('permissions/assign', ['as' => 'moderator.permissions.assign', 'uses' => 'PermissionsController@assign']);
    });
});
