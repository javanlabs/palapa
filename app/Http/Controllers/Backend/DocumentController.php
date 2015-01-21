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

class DocumentController extends Controller {

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

        $setting = Setting::lists('value', 'key');
        $today['day'] = date('l');
        $today['date'] = date('d-m-Y');

        $content = view($templateFile, compact('case', 'setting', 'today'));


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
		$case = $document->cases;

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
