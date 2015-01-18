<?php namespace Eendonesia\Gapura\Repository;

interface RepositoryInterface {

    public function login($credential, $remember);

    public function logout();

    public function register($input);

    public function activate($credential);

    public function forgotPassword($credential);

    public function resetPassword($credential);
}
