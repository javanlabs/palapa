<?php namespace App\Http\Controllers\Backend;

use App\Cases\EloquentRepository;
use App\Setting;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Model\Template;
use App\Cases\Cases;
use Auth;
use App\Cases\Document;
use Input;
use View;

class DocumentController extends Controller {

	public function create()
	{

		$case = Cases::findOrFail(Input::get('case_id'));
		$template = Template::findOrFail(Input::get('template_id'));
		$templateFile = 'template.' . Input::get('template');
		$setting = Setting::lists('value', 'key');


		if(!View::exists($templateFile)){
			return 'template not found';
		}

		$content = view($templateFile, compact('case', 'setting'));


		// $document = Document::create([
		// 	'title'		=> $template->title,
		// 	'content'	=> $content
		// ]);
		// $document->cases()->associate($case)->save();
		// $document->template()->associate($template)->save();
		// return redirect()->route('backend.document.edit', [$document->id]);

		return view('backend.document.create', compact('document', 'content', 'case', 'template'));

	}

	public function store(){
		$case = Cases::findOrFail(Input::get('case_id'));
		$template = Template::findOrFail(Input::get('template_id'));
		$document = Document::create([
			'title'		=> Input::get('title'),
			'content'	=> Input::get('content'),
		]);
		$document->cases()->associate($case)->save();
		$document->template()->associate($template)->save();
		return redirect()->route('backend.document.edit', [$document->id]);
	}

	public function edit($id)
	{
		$document = Document::findOrFail($id);	
		$case = $document->case;	
		return view('backend.document.edit', compact('document', 'case'));
	}


	public function update($id)
	{
		$document = Document::findOrFail($id);
		$document->update(Input::only('content'));

		return redirect()->route('backend.cases.show', $document->cases->id);
	}

	public function destroy($id)
	{
		Document::findOrFail($id)->delete();

		return redirect()->back();
	}

}
?>
