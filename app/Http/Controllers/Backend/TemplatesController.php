<?php namespace App\Http\Controllers\Backend;

use Eendonesia\Skrip\Post\Form;
use Eendonesia\Skrip\Post\Post;
use Eendonesia\Skrip\Post\RepositoryInterface;
use Illuminate\Routing\Controller;
use App\Model\Template;
use Auth;

class TemplatesController extends Controller {

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
        $templates = Template::all();
        return view('backend.templates.index', compact('templates'));
    }

    public function create()
    {
        $template = new Template();
        return view('backend.templates.create', compact('post'));
    }

    public function store(Form $form)
    {
    
        $template = Template::create($form->only('title', 'content'));
        $template->author()->associate(Auth::user())->save();
        return redirect()->route('backend.templates.index');
    }

    public function edit($id)
    {
        $template = Template::find($id);
        return view('backend.templates.edit', compact('template'));
    }

    public function update(Form $form, $id)
    {        
        Template::findOrFail($id)->update($form->only('title', 'content'));
        return redirect()->route('backend.templates.index');
    }

    public function destroy($id)
    {        
        Template::findOrFail($id)->delete();
        return redirect()->route('backend.templates.index');
    }
}
