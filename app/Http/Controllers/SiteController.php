<?php namespace App\Http\Controllers;


class SiteController extends Controller {

    public function getLogin()
    {
        return view('site.login');
    }

    public function postLogin()
    {
        return redirect()->to('kasus');
    }

    public function getLogout()
    {
        return redirect()->to('/');
    }
}
