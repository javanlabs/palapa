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

    public function index()
    {
        $templates = Template::all();
        return view('backend.templates.index', compact('templates'));
    }


    public function edit($id)
    {
        $template = Template::find($id);   
        $filePath = base_path().'/resources/views/template/';

        if($template->case_type_id != "201"){
            $filePath .= $template->case_type_id."/";
        }
        $filePath .= strtolower($template->short_title).'.blade.php';
        $content = file_get_contents($filePath);

        return view('backend.templates.edit', compact('template','content'));
    }

    public function update(Form $form, $id)
    {
        $template = Template::find($id);   
        $filePath = base_path().'/resources/views/template/';

        if($template->case_type_id != "201"){
            $filePath .= $template->case_type_id."/";
        }
        $filePath .= strtolower($template->short_title).'.blade.php';

        File::put($filePath, $form->get('content'));

        return redirect()->route('backend.templates.edit', $id)->with('flash.success', 'Template surat berhasil diperbarui');
    }    
}
