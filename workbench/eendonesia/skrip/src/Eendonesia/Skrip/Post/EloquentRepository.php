<?php namespace Eendonesia\Skrip\Post;

class EloquentRepository implements RepositoryInterface {

    /**
     * @type Post
     */
    private $post;

    function __construct(Post $post)
    {

        $this->post = $post;
    }

    public function all()
    {
        return $this->post->all();
    }

    public function create($input, $author)
    {
        $post = $this->post->create($input);
        $post->author()->associate($author)->save();

        return $post;
    }

    public function update($id, $input)
    {
        return $this->post->findOrFail($id)->update($input);
    }

    public function find($id)
    {
        return $this->post->findOrFail($id);
    }

    public function delete($id)
    {
        return $this->post->findOrFail($id)->delete();
    }
}

