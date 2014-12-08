<?php namespace App\Http\Controllers\Backend;

use App\Cases\Form;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Cases\RepositoryInterface;
use App\Officer\RepositoryInterface as OfficerRepository;
use Illuminate\Support\Facades\Auth;
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
     * @type \Eendonesia\Moderator\RepositoryInterface
     */
    private $moderator;

    function __construct(
        RepositoryInterface $repo,
        OfficerRepository $officer,
        \Eendonesia\Moderator\RepositoryInterface $moderator,
        LookupRepository $lookup
    )
    {
        $this->repo = $repo;
        View::share('page', '');
        $this->lookup = $lookup;
        $this->officer = $officer;
        $this->moderator = $moderator;
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

        return view('backend.cases.create', compact('jaksaLookup', 'staffLookup'));
    }

    public function store(Form $form)
    {
        $this->repo->create($form->all(), Auth::user());

        return redirect()->route('backend.cases.index');
    }

    public function edit($id)
    {
        $officer = $this->repo->find($id);
        $pangkatLookup = $this->lookup->lists('pangkat');
        $jabatanLookup = $this->lookup->lists('jabatan');

        return view('backend.officers.edit', compact('officer', 'pangkatLookup', 'jabatanLookup'));
    }

    public function update(Form $form, $id)
    {
        $this->repo->update($id, $form->all());

        return redirect()->route('backend.officers.index');
    }

    public function destroy($id)
    {
        $this->repo->delete($id);

        return redirect()->route('backend.officers.index');
    }
}
