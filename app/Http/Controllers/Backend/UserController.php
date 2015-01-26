<?php namespace App\Http\Controllers\Backend;


use App\User\UserCreator;
use Eendonesia\Moderator\FormRequests\User as UserForm;
use Illuminate\Http\Request;
use App\Officer\RepositoryInterface;

class UserController extends BackendController {

    /**
     * @var
     */
    private $officerRepo;

    function __construct(RepositoryInterface $officerRepo)
    {
        $this->officerRepo = $officerRepo;

        return parent::__construct();
    }

    public function create(Request $request)
    {
        $officerId = $request->get('officer_id');

        $officer = $this->officerRepo->find($officerId);
        return view('backend.user.create', compact('officer'));
    }

    public function store(UserForm $request)
    {
        $officer = $this->officerRepo->find($request->get('officer_id'));
        with(new UserCreator())->createFromOfficer($request->all(), $officer);

        return redirect()->route('backend.officers.edit', [$officer->id])->with('flash.success', 'Akun baru berhasil dibuat');
    }

    public function destroy($id)
    {
        $officer = $this->officerRepo->find($id);

        with(new UserCreator())->deleteFromOfficer($officer);
        return redirect()->route('backend.officers.edit', [$id])->with('flash.success', 'Akun baru berhasil dihapus');
    }
}
