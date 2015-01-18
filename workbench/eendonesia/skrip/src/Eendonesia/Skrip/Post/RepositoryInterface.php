<?php namespace Eendonesia\Skrip\Post;

interface RepositoryInterface {

    public function all();

    public function create($input, $authorId);

    public function update($id, $input);

    public function find($id);

    public function delete($id);
}
