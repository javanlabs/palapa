<?php namespace App\Http\Controllers\Backend;

use App\Cases\Form;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Cases\RepositoryInterface;
use App\Officer\RepositoryInterface as OfficerRepository;
use App\Sop\RepositoryInterface as SopRepository;
use Eendonesia\Moderator\RepositoryInterface as ModeratorRepository;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\View;

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
        $cities = $this->lookup->cities();
        $religions = $this->lookup->religions();

        return view('backend.cases.create', compact('jaksaLookup', 'staffLookup', 'cities', 'religions'));
    }

    public function store(Form $form)
    {
        $this->repo->create($form->all(), Auth::user());

        return redirect()->route('frontend.search');
    }

    public function show($id)
    {
        $case = $this->repo->find($id);
        $phases = $this->sopRepo->all();
        $activities = $this->repo->histories($case->id);

        return view('backend.cases.show', compact('case', 'phases', 'activities'));
    }

    //public function edit($id)
    //{
    //    $officer = $this->repo->find($id);
    //    $pangkatLookup = $this->lookup->lists('pangkat');
    //    $jabatanLookup = $this->lookup->lists('jabatan');
    //
    //    return view('backend.officers.edit', compact('officer', 'pangkatLookup', 'jabatanLookup'));
    //}
    //
    //public function update(Form $form, $id)
    //{
    //    $this->repo->update($id, $form->all());
    //
    //    return redirect()->route('backend.officers.index');
    //}
    //
    //public function destroy($id)
    //{
    //    $this->repo->delete($id);
    //
    //    return redirect()->route('backend.officers.index');
    //}
}
