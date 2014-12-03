<?php namespace Eendonesia\Moderator\Controllers;

use App\Http\Controllers\Controller;

class SiteController extends Controller {

    public function getIndex()
    {
        return 'welcome admin';
    }

    public function getLogin()
    {
        return 'admin login';
    }
}
