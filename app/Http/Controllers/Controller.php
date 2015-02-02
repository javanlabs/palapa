<?php namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;

abstract class Controller extends BaseController {

	use ValidatesRequests;


    function __construct()
    {
        setlocale(LC_TIME,'id_ID.utf8');

        if(Auth::check())
        {
            $count = App::make('App\Cases\RepositoryInterface')->countAlert(Auth::user());
            View::share('caseAlertCount', $count);
        }
    }
}
