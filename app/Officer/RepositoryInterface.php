<?php namespace App\Officer;

interface RepositoryInterface {

    public function all();

    public function jaksa();

    public function staff();

    public function create($input);

    public function update($id, $input);

    public function find($id);

    public function delete($id);

    public function listJaksa();

    public function listStaff();

    public function listRole();
}
