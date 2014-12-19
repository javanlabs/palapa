<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

$router->get('/', 'Frontend\HomeController@getIndex');
$router->controller('home', 'Frontend\HomeController', [
    'getSearch'  => 'frontend.search',
    'getProfile'  => 'frontend.profile',
    'getOrganization'  => 'frontend.organization',
    'getOfficer'  => 'frontend.officer',
]);

$router->get('post/show/{id}', ['as'=>'frontend.post', 'uses'=>'Frontend\PostController@showPage']);

//BACKEND
$router->group(['prefix' => 'backend', 'namespace' => 'Backend'], function($router){

    $router->resource('officers', 'OfficerController');

    $router->resource('cases', 'CaseController');
    $router->get('cases/edit/{id}', 'CaseController@edit');
    $router->get('cases/{caseId}/check/{checklistId}', ['as' => 'backend.cases.checklist', 'uses' => 'CaseController@getChecklist']);
    $router->post('cases/{caseId}/check/{checklistId}', ['as' => 'backend.cases.checklist', 'uses' => 'CaseController@postChecklist']);
    $router->post('cases/{caseId}/uncheck/{checklistId}', ['as' => 'backend.cases.unchecklist', 'uses' => 'CaseController@postUnchecklist']);
    $router->get('cases/byJaksa/{id}', ['as'=>'backend.cases.byJaksa', 'uses' => 'CaseController@getByJaksa']);

    $router->post('cases/{caseId}/activities', ['as' => 'backend.cases.activity', 'uses' => 'CaseController@postActivity']);

    $router->delete('cases/{caseId}', ['as' => 'backend.cases.delete', 'uses' => 'CaseController@destroy']);

    $router->get('dashboard/index', ['as' => 'dashboard.index', 'uses' => 'DashboardController@getIndex']);
    $router->get('dashboard/byPhase', ['as' => 'dashboard.byPhase', 'uses' => 'DashboardController@getByPhase']);
    $router->get('dashboard/byStatus', ['as' => 'dashboard.byStatus', 'uses' => 'DashboardController@getByStatus']);
    $router->get('dashboard/byJaksa', ['as' => 'dashboard.byJaksa', 'uses' => 'DashboardController@getByJaksa']);

    $router->get('setting/index', ['as' => 'setting.index', 'uses' => 'SettingController@index']);
    $router->post('setting', ['as' => 'setting.store', 'uses' => 'SettingController@store']);

    $router->resource('templates', 'TemplatesController');
    $router->resource('document', 'DocumentController');
});

// GLOBAL ROUTE
$router->get('login', 'SiteController@getLogin');
$router->post('login', 'SiteController@postLogin');
$router->get('logout', 'SiteController@getLogout');

$router->get('kasus', 'HomeController@index');
$router->get('statistik', 'HomeController@statistic');

/*
|--------------------------------------------------------------------------
| Authentication & Password Reset Controllers
|--------------------------------------------------------------------------
|
| These two controllers handle the authentication of the users of your
| application, as well as the functions necessary for resetting the
| passwords for your users. You may modify or remove these files.
|
*/

//$router->controller('auth', 'AuthController');

//$router->controller('password', 'PasswordController');
