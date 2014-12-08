<?php namespace App\Officer;

interface RepositoryInterface {

    public function all();

    public function create($input);

    public function update($id, $input);

    public function find($id);

    public function delete($id);

    public function jaksa();

    public function staff();
}
