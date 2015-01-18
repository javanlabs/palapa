<?php namespace Eendonesia\Gapura\Controllers;

use Eendonesia\Gapura\Repository\RepositoryInterface;
use Eendonesia\Gapura\Requests\Login;
use Eendonesia\Gapura\Requests\Register;
use Illuminate\Routing\Controller as Controller;
use Illuminate\Support\MessageBag;

class GapuraController extends Controller {

    protected $config;

    function __construct()
    {
        $this->config = app()->make('config');
    }

    public function getHome()
    {
        return view('gapura::home');
    }

    public function getLogin()
    {
        return view('gapura::login');
    }

    public function postLogin(Login $request, RepositoryInterface $repo)
    {
        $login = $repo->login($request->only('email', 'password'), $request->only('remember'));

        if($login)
        {
            return redirect()->route($this->config->get('gapura::default_auth'));
        }

        return redirect()->back()->withInput()->withErrors(new MessageBag(['email' => 'invalid credentials', 'password' => 'invalid credentials']));
    }

    public function getLogout(RepositoryInterface $repo)
    {
        $repo->logout();
        return redirect()->route($this->config->get('gapura::default_guest'));
    }

    public function getRegister()
    {
        return view('gapura::register');
    }

    public function postRegister(Register $request, RepositoryInterface $repo)
    {
        if($repo->register($request->all()))
        {
            return view('gapura::register_success');
        }

        return redirect()->back();
    }

    public function getActivation()
    {

    }

    public function postActivation()
    {

    }

    public function getReminder()
    {

    }

    public function postReminder()
    {

    }
}
