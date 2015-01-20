<?php namespace App\Http\Controllers\Backend;

use Eendonesia\Skrip\Post\Form;
use Eendonesia\Skrip\Post\RepositoryInterface;
use Illuminate\Routing\Controller;
use App\Model\Template;
use Auth;
use Illuminate\Support\Facades\File;

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

//    public function create()
//    {
//        $template = new Template();
//        $checklists = Checklist::availableChecklists();
//        return view('backend.templates.create', compact('post','checklists'));
//    }
//
//    public function store(Form $form)
//    {
//
//        $template = Template::create($form->only('title', 'content', 'checklist_id'));
//        $template->author()->associate(Auth::user())->save();
//        return redirect()->route('backend.templates.index');
//    }

    public function edit($id)
    {
        $template = Template::find($id);

        if(!is_file($template->file))
        {
            File::put($template->file, '');
        }

        $content = file_get_contents($template->file);

        return view('backend.templates.edit', compact('template','content'));
    }

    public function update(Form $form, $id)
    {
        $template = Template::findOrFail($id);

        File::put($template->file, $form->get('content'));

        return redirect()->route('backend.templates.edit', $id)->with('flash.success', 'Template surat berhasil diperbarui');
    }

    public function destroy($id)
    {
        Template::findOrFail($id)->delete();
        return redirect()->route('backend.templates.index');
    }
}
