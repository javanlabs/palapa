<?php namespace App\Http\Controllers;

use App\Cases\Cases;
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

        $categoryName = $category;
        if($category == Cases::TYPE_DATUN)
        {
            $categoryName = 'Datun';
        }

        return view('frontend.post', compact('post', 'category', 'categoryName', 'allPostInCategory', 'id'));
    }
}
