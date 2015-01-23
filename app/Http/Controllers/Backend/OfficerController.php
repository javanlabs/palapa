<?php namespace App\Http\Controllers\Backend;

use App\Officer\Form;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Officer\Officer;
use App\Officer\RepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;

class OfficerController extends BackendController {

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
        View::share('page', 'backend-officer');
        $this->lookup = $lookup;

        return parent::__construct();
    }

    public function index(Request $request)
    {
        $role = $request->get('role');

        if($role == Officer::ROLE_STAFF)
        {
            $officers = $this->repo->staff();
        }
        else
        {
            $role = Officer::ROLE_JAKSA;
            $officers = $this->repo->jaksa();
        }

        $countJaksa = count($this->repo->listJaksa());
        $countStaff = count($this->repo->listStaff());

        return view('backend.officers.index', compact('officers', 'role', 'countJaksa', 'countStaff'));
    }

    public function create()
    {
        $pangkatLookup = $this->lookup->lists('pangkat');
        $jabatanLookup = $this->lookup->lists('jabatan');
        $roles         = $this->repo->listRole();

        return view('backend.officers.create', compact('pangkatLookup', 'jabatanLookup', 'roles'));
    }

    public function store(Form $form)
    {
        $officer = $this->repo->create($form->all());

        return redirect()->route('backend.officers.index', ['role' => $officer->role])->with('flash.success', 'Data SDM berhasil disimpan');
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

        return redirect()->route('backend.officers.index')->with('flash.success', 'Data SDM berhasil diperbarui');
    }

    public function destroy($id)
    {
        $officer = $this->repo->find($id);
        $this->repo->delete($id);

        return redirect()->back()->with('flash.info', $officer->name . ' telah dihapus dari database ' . $officer->role);
    }
}
