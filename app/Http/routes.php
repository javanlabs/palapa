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
