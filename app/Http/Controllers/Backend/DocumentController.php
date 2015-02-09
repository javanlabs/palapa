<?php namespace App\Http\Controllers\Backend;

use App\Setting;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Model\Template;
use App\Cases\Cases;
use Auth;
use App\Cases\Document;
use Input;
use View;
use App\Sop\RepositoryInterface as SopRepo;
use App\Sop\Checklist;
use Carbon\Carbon;

class DocumentController extends Controller {
	private $sop;

	function __construct(SopRepo $sop)
    {
        $this->sop = $sop;

    }

	public function create()
	{

		$case = Cases::findOrFail(Input::get('case_id'));

        if(!$case['is_allow_create_document'])
        {
            return redirect()->to($case['permalink_edit'])->with('flash.warning', 'Silakan lengkapi data kasus terlebih dahulu.');
        }

		$template = Template::findOrFail(Input::get('template_id'));

        if($case->type_id == Cases::TYPE_PIDUM)
        {
            $templateFile = 'template.' . Input::get('template');
        }
        else
        {
            $templateFile = 'template.' . $case->type_id . '.' . Input::get('template');
        }

		if(!View::exists($templateFile)){
			return 'template not found';
		}
		setlocale(LC_TIME,'id_ID.utf8');

        $setting = Setting::lists('value', 'key');
        $today['day'] = date('l');
        $today['date'] = date('d-m-Y');
    
		$category = '';
		switch($case->category){			
			case 'kamtibum':
			$category = 'Ep.1';
			break;
			case 'oharda':
			$category = 'Epp.1';
			break;
			case 'tpul':
			$category = 'Euh.1';
			break;
		}

        $content = view($templateFile, compact('case', 'setting', 'today', 'category'));

		return view('backend.document.create', compact('document', 'content', 'case', 'template'));

	}

	public function store(){
		$case = Cases::findOrFail(Input::get('case_id'));
		$template = Template::findOrFail(Input::get('template_id'));

        $document = $this->sop->addDocument($case, $template, Input::get('content'));

		return redirect()->route('backend.document.edit', [$document->id])->with('flash.success', 'Dokumen berhasil dibuat');
	}

	public function edit($id)
	{
		$document = Document::findOrFail($id);
		$case = $document->cases;
        $template = $document->template;

		return view('backend.document.edit', compact('document', 'case', 'template'));
	}


	public function update($id)
	{
		$document = $this->sop->updateDocument($id, Input::get('content'));

        if($document)
        {
            return redirect()->route('backend.cases.show', $document->cases->id)->with('flash.success', 'Dokumen berhasil disimpan');
        }

        return redirect()->route('backend.cases.show', $document->cases->id)->with('flash.error', 'Gagal menyimpan dokumen');

	}

	public function destroy($id)
	{
        $this->sop->deleteDocument($id);
		return redirect()->back()->with('flash.warning', 'Dokumen berhasil dihapus');
	}

}
?>
