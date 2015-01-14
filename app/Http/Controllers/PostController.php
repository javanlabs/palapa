<?php namespace App\Http\Controllers;

use Eendonesia\Skrip\Post\Post;
use Eendonesia\Skrip\Post\RepositoryInterface;

class PostController extends Controller {

    /**
     * @type RepositoryInterface
     */
    private $repo;

    function __construct(RepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function show($category, $id = null){
        $post = null;
        $allPostInCategory = Post::wherePosition($category)->get();

        if($id)
        {
            $post = $this->repo->find($id);
        }

        return view('frontend.post', compact('post', 'category', 'allPostInCategory', 'id'));
    }    
}
