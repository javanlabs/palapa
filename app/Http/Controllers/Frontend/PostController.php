<?php namespace App\Http\Controllers\Frontend;

use Eendonesia\Skrip\Post\Post;
use App\Http\Controllers\Controller;
use App\Lookup\Form;
use App\Lookup\RepositoryInterface as LookupRepository;
use \Eendonesia\Skrip\Post\RepositoryInterface;
use Illuminate\Support\Facades\View;

class PostController extends Controller {

    /**
     * @type RepositoryInterface
     */
    private $repo;
    /**
     * @type LookupRepository
     */
    private $lookup;

    function __construct(RepositoryInterface $repo, LookupRepository $lookup)
    {
        $this->repo = $repo;
        $this->lookup = $lookup;
    }

    public function index(){

    }

    public function showPage($id){
        $post = Post::find($id);        
        return view('frontend.post', compact('post'))->with('page',$post->id);
    }    
}
