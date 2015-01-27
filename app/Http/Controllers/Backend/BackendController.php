<?php namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

class BackendController extends Controller {


    function __construct()
    {
	setlocale(LC_TIME,'id_ID.utf8');
    }
}
