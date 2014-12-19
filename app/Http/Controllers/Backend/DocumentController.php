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

class DocumentController extends Controller {

	public function create()
	{
		$case = Cases::findOrFail(Input::get('case_id'));
		$template = Template::findOrFail(Input::get('template_id'));

		$document = Document::create([
			'title'		=> $template->title,
			'content'	=> $template->content
		]);

		$document->cases()->associate($case)->save();
		$document->template()->associate($template)->save();

		return redirect()->route('backend.document.edit', [$document->id]);
	}

	public function edit($id)
	{
		$document = Document::findOrFail($id);
		$content = $this->fillParams($document->content, $document->cases, Setting::lists('value', 'key'));
		$case = $document->case;
		return view('backend.document.edit', compact('document', 'content', 'case'));
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

	public function fillParams($template, $case, $config)
	{
		$template = str_replace("{case.spdp_number}", $case->spdp_number, $template);
		$template = str_replace("{case.pasal}", $case->pasal, $template);
		$template = str_replace("{case.kasus}", $case->kasus, $template);
		$template = str_replace("{case.start_date}", $case->start_date, $template);
		$template = str_replace("{case.finish_date}", $case->finish_date, $template);
		$template = str_replace("{case.suspect_name}", $case->suspect_name, $template);
		$template = str_replace("{case.suspect_pob}", $case->suspect_pob, $template);
		$template = str_replace("{case.suspect_dob}", $case->suspect_dob, $template);
		$template = str_replace("{case.suspect_religion}", $case->suspect_religion, $template);
		$template = str_replace("{case.suspect_address}", $case->suspect_address, $template);
		$template = str_replace("{case.suspect_nationality}", $case->suspect_nationality, $template);
		$template = str_replace("{case.suspect_job}", $case->suspect_job, $template);
		$template = str_replace("{case.suspect_education}", $case->suspect_education, $template);
		$template = str_replace("{case.penyidik}", $case->penyidik, $template);
		$template = str_replace("{case.created_at}", $case->created_at, $template);

		return $template;
	}
}
?>
