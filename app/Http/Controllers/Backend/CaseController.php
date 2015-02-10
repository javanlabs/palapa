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
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\View;
use App\Model\Template;
use Input;
use Laracasts\Flash\Flash;

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

        return parent::__construct();
    }

    public function index()
    {
        $owner = Input::get('owner', 'all');
        $type = Input::get('type');

        $cases = $this->repo->search(Input::get('q'), $type, true, $owner=='me');

        $count['all'] = $this->repo->count();
        $count['me'] = $this->repo->countByOwner(Auth::user());

        $caseTypes = $this->lookup->lists('kasus', 'Semua Jenis Kasus');

        return view('backend.cases.index', compact('cases', 'owner', 'count', 'caseTypes', 'type'));
    }

    public function create()
    {
        $jaksaLookup = $this->officer->listJaksa();
        $staffLookup = $this->officer->listStaff();
        $cities = Kabupaten::lists('nama', 'id');
        $religions = $this->lookup->religions();

        $type = $this->lookup->find(Input::get('type', 201));
        $penyidikLookup = $this->lookup->penyidik($type->id);

        $categories = $this->lookup->caseCategoryByType($type->id, '-- Pilih Kategori --');

        return view('backend.cases.create', compact('penyidikLookup','jaksaLookup', 'staffLookup', 'cities', 'religions', 'type', 'categories'));
    }

    public function store(Form $form)
    {
        $case = $this->repo->create($form->all(), Auth::user());

        Flash::success(trans('flash/case.created'));
        return redirect()->route('backend.cases.show', $case->id);
    }

    public function edit($id){
        $case = $this->repo->find($id);
        $jaksaLookup = $this->officer->listJaksa('-- Pilih Jaksa --');
        $staffLookup = $this->officer->listStaff();
        $type = $this->lookup->find($case->type_id);
        $penyidikLookup = $this->lookup->penyidik($type->id);
        $categories = $this->lookup->caseCategoryByType($case->type_id, '-- Pilih Kategori --');

        return view('backend.cases.edit', compact('penyidikLookup','case', 'jaksaLookup', 'staffLookup', 'type', 'categories'));
    }

    public function update(Form $form, $id)
    {
        $this->repo->update($id, $form->all(), Auth::user());

        Flash::success(trans('flash/case.updated'));

        return redirect()->route('backend.cases.show', $id);
    }

    public function view($id)
    {
        $case = $this->repo->find($id);
        $phases = $this->sopRepo->byType($case->type_id);
        $activities = $this->repo->activities($case);
        $suspects = $case->suspects;
        $witness = $case->witness;

        return view('backend.cases.view', compact('case', 'phases', 'activities', 'suspects', 'witness'));

    }

    public function show($id)
    {
        $case = $this->repo->find($id);

        if(!Auth::user()->canManage($case))
        {
            Flash::warning('flash/case.edit_not_allowed');
            return redirect()->route('backend.cases.index');
        }

        $phases = $this->sopRepo->byType($case->type_id);
        $activities = $this->repo->activities($case);
        $checklists = $case->checklist;
        $phaseIds = $case->phaseHistory->lists('id');
        $templates = Template::byCaseType($case->type_id)->get();
        $documentsIds = $case->documents->lists('template_id', 'id');
        $sop = $this->sopRepo;
        $phaseHistories = $this->sopRepo->getPhaseHistory($case);
        $evidences = $case->evidences;

        return view('backend.cases.show', compact('case', 'phases', 'activities', 'checklists', 'templates', 'templates', 'documentsIds', 'sop', 'evidences', 'phaseIds', 'phaseHistories'));
    }

    public function destroy($id)
    {
        $this->repo->delete($id, Auth::user());

        Flash::warning(trans('flash/case.deleted'));

        return redirect()->route('backend.cases.index');
    }

    public function getChecklist($caseId, $checklistId)
    {
        $case = $this->repo->find($caseId);
        $checklist = Checklist::findOrFail($checklistId);

        $relatedData = $checklist->getRelatedData();

        return view('backend.cases.activity', compact('case', 'checklist', 'relatedData'));
    }

    public function postChecklist(Request $request, $caseId, $checklistId)
    {
        $case = $this->repo->find($caseId);
        $checklist = Checklist::findOrFail($checklistId);

        $this->sopRepo->addChecklist($case, $checklist, $request->only('date', 'note', 'data', 'number'));

        Flash::success(trans('flash/case.checklist.checked'));

        $data['status'] = 1;

        return response()->json($data);
    }

    public function postUnchecklist($caseId, $checklistId)
    {
        $case = $this->repo->find($caseId);
        $checklist = Checklist::findOrFail($checklistId);

        $this->sopRepo->removeChecklist($case, $checklist);
        Flash::warning(trans('flash/case.checklist.unchecked'));

        return redirect()->back();
    }

    public function postActivity(Request $request, $caseId)
    {
        $case = $this->repo->find($caseId);
        $this->repo->addActivity($case, $request->only('content'));

        Flash::success(trans('flash/case.activity.created'));

        return redirect()->back();
    }

    public function getByJaksa($id)
    {
        $cases = $this->repo->byJaksa($id);
        $officer = $this->officer->find($id);

        return view('backend.cases.byJaksa', compact('cases', 'officer'));
    }

    public function addMember($caseId)
    {
        $case = $this->repo->find($caseId);
        $members = $case->members;

        $jaksa = $this->officer->listJaksa();
        foreach($case->members()->lists('id') as $id)
        {
            unset($jaksa[$id]);
        }

        return view('backend.cases.member.add', compact('case', 'jaksa', 'members'));
    }

    public function storeMember($caseId, Request $request)
    {
        $case = $this->repo->find($caseId);
        $jaksa = $this->officer->find($request->get('officer_id'));

        $case->members()->attach($jaksa);

        Event::fire('case.officer.added', [$case, $jaksa]);
        Flash::success(trans('flash/case.officer.added'));

        return redirect()->route('backend.cases.show', [$case->id]);
    }

    public function removeMember($caseId, $officerId)
    {
        $case = $this->repo->find($caseId);
        $jaksa = $this->officer->find($officerId);

        $case->members()->detach($officerId);
        Event::fire('case.officer.removed', [$case, $jaksa]);
        Flash::warning(trans('flash/case.officer.removed'));

        return redirect()->route('backend.cases.show', [$case->id]);
    }

    public function alert()
    {
        $cases = $this->repo->alert(Auth::user());

        return view('backend.cases.alert', compact('cases'));
    }

    public function getChecklistEdit($caseId, $checklistId)
    {
        $case = $this->repo->find($caseId);
        $checklist = $case->checklist()->where('checklist_id', '=', $checklistId)->firstOrFail();

        $relatedData = $checklist->getRelatedData();

        return view('backend.cases.checklist.edit', compact('case', 'checklist', 'relatedData'));
    }

    public function postChecklistUpdate(Request $request, $caseId, $checklistId)
    {
        $case = $this->repo->find($caseId);
        $checklist = Checklist::findOrFail($checklistId);

        $this->sopRepo->updateChecklist2($case, $checklist, $request->only('date', 'number', 'note', 'data'));

        $data['status'] = 1;
        return response()->json($data);
    }

    public function skipPhase($caseId)
    {
        $case = $this->repo->find($caseId);
        $this->sopRepo->skipPhase($case);

        Flash::success(trans('flash/case.skip'));

        return redirect()->route('backend.cases.show', [$case->id]);
    }

}
