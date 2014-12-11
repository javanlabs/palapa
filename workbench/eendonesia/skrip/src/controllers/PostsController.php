<?php namespace Eendonesia\Skrip\Controllers;

use Eendonesia\Skrip\Post\Form;
use Eendonesia\Skrip\Post\Post;
use Eendonesia\Skrip\Post\RepositoryInterface;
use Illuminate\Routing\Controller;
use Auth;

class PostsController extends Controller {

    /**
     * @type RepositoryInterface
     */
    private $repo;

    function __construct(RepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function index()
    {
        $posts = $this->repo->all();
        return view('skrip::posts.index', compact('posts'));
    }

    public function create()
    {
        $post = new Post();
        return view('skrip::posts.create', compact('post'));
    }

    public function store(Form $form)
    {
        $this->repo->create($form->only('title', 'content'), Auth::user());

        return redirect()->route('skrip.posts.index');
    }

    public function edit($id)
    {
        $post = $this->repo->find($id);
        return view('skrip::posts.edit', compact('post'));
    }

    public function update(Form $form, $id)
    {
        $this->repo->update($id, $form->only('title', 'content', 'position', 'status'));

        return redirect()->route('skrip.posts.index');
    }

    public function destroy($id)
    {
        $this->repo->delete($id);

        return redirect()->route('skrip.posts.index');
    }
}
