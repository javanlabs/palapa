<?php namespace Eendonesia\Gapura\Repository;

class EloquentRepository implements RepositoryInterface{

    protected $model;

    protected $config;

    protected $hash;

    protected $auth;

    function __construct()
    {
        $this->config = app()->make('config');
        $this->model = app()->make($this->config->get('auth.model'));
        $this->hash = app()->make('hash');
        $this->auth = app()->make('auth');
    }

    public function login($credential, $remember)
    {
        return $this->auth->attempt($credential, $remember);
    }

    public function logout()
    {
        $this->auth->logout();
    }

    public function register($input)
    {
        $user = $this->model->newInstance();
        $user->name = $input['name'];
        $user->email = $input['email'];
        $user->password = $this->hash->make($input['password']);

        if($user->save())
        {
            return $user;
        }

        return false;
    }

    public function activate($credential)
    {
        // TODO: Implement activate() method.
    }

    public function forgotPassword($credential)
    {
        // TODO: Implement forgotPassword() method.
    }

    public function resetPassword($credential)
    {
        // TODO: Implement resetPassword() method.
    }
}
