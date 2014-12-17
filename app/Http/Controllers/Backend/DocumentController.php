<?php namespace App\Http\Controllers\Backend;

use App\Cases\EloquentRepository;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Model\Template;
use App\Cases\Cases;
use Auth;
use App\Cases\Document;
use Input;

class DocumentController extends Controller {
	public function create(){
		$case = Cases::findOrFail(Input::get('case_id'));
		$template = Template::findOrFail(Input::get('template_id'));
		$title = $template->title;
		$content = $template->content;
		return view('backend.document.create', compact('case', 'template', 'title', 'content'));
	}

	public function edit(){
		$document = Document::findOrFail(Input::get('id'));
		return view('backend.document.edit', compact('case', 'template', 'content'));
	}

	public function store(Request $request, EloquentRepository $caseRepo){
		$case = $caseRepo->find($request->get('case_id'));
		$document = new Document();
		$document->title = $request->get('title');
		$document->content = $request->get('content');
		$document->save();

		$case->documents()->save($document);

		return redirect()->to('backend/cases/' . Input::get('case_id'));
	}

	public function update(){

	}

	public function delete(){

	}
}
?>
