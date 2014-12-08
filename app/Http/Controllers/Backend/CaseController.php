<?php namespace App\Http\Controllers\Backend;

use App\Lookup\Form;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Cases\RepositoryInterface;
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

    function __construct(RepositoryInterface $repo, LookupRepository $lookup)
    {
        $this->repo = $repo;
        View::share('page', '');
        $this->lookup = $lookup;
    }

    public function index()
    {
        $officers = $this->repo->all();
        return view('backend.cases.index', compact('officers'));
    }

    public function create()
    {
        $jaksaLookup = $this->lookup->lists('pangkat');
        $staffLookup = $this->lookup->lists('jabatan');
        return view('backend.cases.create', compact('jaksaLookup', 'staffLookup'));
    }

    public function store(Form $form)
    {
        $this->repo->create($form->all());

        return redirect()->route('backend.officers.index');
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
