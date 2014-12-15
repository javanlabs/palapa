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

        return view('backend.dashboard.byStatus', compact('stat'))->with('page', 'backend-dashboard');
    }

    public function getByPhase(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $stat = $this->caseRepo->statisticByPhase($year);

        return view('backend.dashboard.byPhase', compact('stat'))->with('page', 'backend-dashboard');
    }

    public function getByJaksa()
    {
        $officers = $this->officerRepo->jaksaByCase();

        return view('backend.dashboard.byJaksa', compact('officers'))->with('page', 'backend-dashboard');
    }

}
