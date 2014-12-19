<?php namespace App\Http\Controllers\Backend;

use App\Cases\RepositoryInterface;
use Illuminate\Http\Request;

class DashboardController extends BackendController {

    /**
     * @type EloquentRepository
     */
    private $caseRepo;
    /**
     * @type \App\Officer\RepositoryInterface
     */
    private $officerRepo;

    function __construct(RepositoryInterface $caseRepo, \App\Officer\RepositoryInterface $officerRepo)
    {
        $this->caseRepo = $caseRepo;
        $this->officerRepo = $officerRepo;
    }

    public function getIndex()
    {
        return redirect()->route('dashboard.byPhase');
    }

    public function getByStatus(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $stat = $this->caseRepo->statisticByStatus($year);

        return view('backend.dashboard.byStatus', compact('stat', 'year'))->with('page', 'backend-dashboard');
    }

    public function getByPhase(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $type = $request->get('type');

        $stat = $this->caseRepo->statisticByPhase($year, $type);
        $types = $this->caseRepo->getParentTypeList();

        return view('backend.dashboard.byPhase', compact('stat', 'types', 'year', 'type'))->with('page', 'backend-dashboard');
    }

    public function getByJaksa(Request $request)
    {
        $officers = $this->officerRepo->jaksaByCase();
        $year = $request->get('year', date('Y'));

        return view('backend.dashboard.byJaksa', compact('officers', 'year'))->with('page', 'backend-dashboard');
    }

}
