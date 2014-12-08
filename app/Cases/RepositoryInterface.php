<?php namespace App\Cases;

interface RepositoryInterface {

    public function all();

    public function create($input);

    public function update($id, $input);

    public function find($id);

    public function delete($id);
}
