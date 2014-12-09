<?php namespace App\Cases;

interface RepositoryInterface {

    public function all();

    public function create($input, $user);

    public function update($id, $input);

    public function find($id);

    public function delete($id);

    public function search($keyword, $type);

    public function histories($id);

    public function dailyCaseStatistic($from, $to);

}
