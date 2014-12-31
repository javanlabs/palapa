<?php namespace App\Http\Controllers\Backend;

use App\Setting;
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
use App\Sop\Phase;
class SettingController extends BackendController {
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
    public function index()
    {
        $setting = Setting::lists('value', 'key');
        return view('backend.setting.index', compact('setting'))->with('page', 'backend-setting');
    }

    public function store(Request $request)
    {
        with(new Setting())->saveAll($request->all());
        return redirect()->back();
    }

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

    public function sop(){
        $casesLookup = $this->lookup->lists('kasus');
        $kasus_id = Input::get('kasus_id');
        $phases = null;
        $checklists = null;
     
        if($kasus_id){
            $phases = Phase::where('case_type_id', '=', $kasus_id)->get();     
            $ids = array();
            foreach($phases as $phase){
                $ids[] = $phase->id;
            }       
            $checklists = Checklist::whereIn('phase_id', $ids)->get();
        }
        return view('backend.setting.sop', compact('casesLookup', 'phases', 'checklists'))->with('page', 'backend-setting');
    }
}
