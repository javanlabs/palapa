<?php namespace App\Http\Controllers\Backend;

use Eendonesia\Skrip\Post\Form;
use Eendonesia\Skrip\Post\Post;
use Eendonesia\Skrip\Post\RepositoryInterface;
use Illuminate\Routing\Controller;
use App\Model\Template;
use App\Sop\Checklist;
use App\Cases\Cases;
use Auth;
use Input;

class DocumentController extends Controller {
	public function create(){
		$case = Cases::findOrFail(Input::get('case_id'));
		$template = Template::findOrFail(Input::get('template_id'));
		$content = $template->content;
		return view('backend.document.create', compact('case', 'template', 'content'));
	}
}
?>
