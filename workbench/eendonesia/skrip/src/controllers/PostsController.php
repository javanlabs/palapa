<?php namespace Eendonesia\Skrip\Controllers;

use Eendonesia\Skrip\Post\Form;
use Eendonesia\Skrip\Post\Post;
use Eendonesia\Skrip\Post\RepositoryInterface;
use Illuminate\Http\Request;
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

    public function index(Request $request)
    {
        $position = $request->get('position', 'pembinaan');

        $posts = $this->repo->getByPosition($position);
        $count['pembinaan'] = $this->repo->countByPosition('pembinaan');
        $count['intelijen'] = $this->repo->countByPosition('intelijen');
        $count['pidum'] = $this->repo->countByPosition('201');
        $count['pidsus'] = $this->repo->countByPosition('202');

        return view('skrip::posts.index', compact('posts', 'count', 'position'));
    }

    public function create()
    {
        $post = new Post();
        return view('skrip::posts.create', compact('post'));
    }

    public function store(Form $form)
    {
        $this->repo->create($form->only('title', 'content', 'position', 'status'), Auth::user());

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
