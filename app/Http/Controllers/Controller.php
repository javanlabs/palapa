<?php namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

abstract class Controller extends BaseController {

	use ValidatesRequests;


    function __construct()
    {
        setlocale(LC_TIME,'id_ID.utf8');
    }
}
