<?php namespace App\Http\Controllers\Backend;

use App\Cases\Form;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Cases\RepositoryInterface;
use App\Officer\RepositoryInterface as OfficerRepository;
use App\Sop\Checklist;
use App\Sop\RepositoryInterface as SopRepository;
use Eendonesia\Moderator\RepositoryInterface as ModeratorRepository;
use Eendonesia\Wilayah\Kabupaten;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use App\Model\Template;
use Input;

class CaseController extends BackendController {

    /**
     * @type RepositoryInterface
     */
    private $repo;
    /**
     * @type LookupRepository
     */
    private $lookup;
    /**
     * @type OfficerRepository
     */
    private $officer;
    /**
     * @type ModeratorRepository
     */
    private $moderator;
    /**
     * @type SopRepository
     */
    private $sopRepo;

    function __construct(
        RepositoryInterface $repo,
        OfficerRepository $officer,
        ModeratorRepository $moderator,
        LookupRepository $lookup,
        SopRepository $sopRepo
    )
    {
        $this->repo = $repo;
        View::share('page', '');
        $this->lookup = $lookup;
        $this->officer = $officer;
        $this->moderator = $moderator;
        $this->sopRepo = $sopRepo;
    }

    public function index()
    {
        $officers = $this->repo->all();
        return view('backend.cases.index', compact('officers'));
    }

    public function create()
    {
        $jaksaLookup = $this->officer->jaksa();
        $staffLookup = $this->moderator->usersByGroups('staff')->lists('name', 'id');
        $cities = Kabupaten::lists('nama', 'id');
        $religions = $this->lookup->religions();
        $penyidikLookup = $this->lookup->lists('penyidik');
        $type = $this->lookup->find(Input::get('type', 201));

        return view('backend.cases.create', compact('penyidikLookup','jaksaLookup', 'staffLookup', 'cities', 'religions', 'type'));
    }

    public function store(Form $form)
    {
        $this->repo->create($form->all(), Auth::user());

        return redirect()->route('frontend.search');
    }

    public function edit($id){
        $case = $this->repo->find($id);
        $jaksaLookup = $this->officer->jaksa();
        $staffLookup = $this->moderator->usersByGroups('staff')->lists('name', 'id');
        $cities = Kabupaten::lists('nama', 'id');
        $religions = $this->lookup->religions();

        return view('backend.cases.edit', compact('case', 'jaksaLookup', 'staffLookup', 'cities', 'religions'));
    }

    public function update(Form $form, $id){
        $this->repo->update($id, $form->all());
        return redirect()->route('backend.cases.show', $id);
    }

    public function show($id)
    {
        $case = $this->repo->find($id);
        $phases = $this->sopRepo->byType($case->type_id);
        $activities = $this->repo->activities($case);
        $checklistIds = $case->checklist->lists('id');
        $templates = $case->templates();
        $documentsIds = $case->documents->lists('id', 'id');

        return view('backend.cases.show', compact('case', 'phases', 'activities', 'checklistIds', 'templates', 'templates', 'documentsIds'));
    }

    public function destroy($id)
    {
        $this->repo->delete($id);

        return redirect()->route('frontend.search');
    }

    public function getChecklist($caseId, $checklistId)
    {
        $case = $this->repo->find($caseId);
        $checklist = Checklist::findOrFail($checklistId);

        return view('backend.cases.activity', compact('case', 'checklist'));
    }

    public function postChecklist(Request $request, $caseId, $checklistId)
    {
        $case = $this->repo->find($caseId);
        $checklist = Checklist::findOrFail($checklistId);

        $this->sopRepo->addChecklist($case, $checklist, $request->only('date', 'note'));

        $data['status'] = 1;

        return response()->json($data);
    }

    public function postUnchecklist($caseId, $checklistId)
    {
        $case = $this->repo->find($caseId);
        $checklist = Checklist::findOrFail($checklistId);

        $this->sopRepo->removeChecklist($case, $checklist);

        return redirect()->back();
    }

    public function postActivity(Request $request, $caseId)
    {
        $case = $this->repo->find($caseId);
        $this->repo->addActivity($case, $request->only('content'));

        return redirect()->back();
    }

    public function getByJaksa($id)
    {
        $cases = $this->repo->byJaksa($id);
        $officer = $this->officer->find($id);

        return view('backend.cases.byJaksa', compact('cases', 'officer'));
    }
}
