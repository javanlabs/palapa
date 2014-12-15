<?php namespace App\Http\Controllers\Backend;

use App\Cases\RepositoryInterface;
use Illuminate\Http\Request;

class DashboardController extends BackendController {

    /**
     * @type EloquentRepository
     */
    private $caseRepo;

    function __construct(RepositoryInterface $caseRepo)
    {
        $this->caseRepo = $caseRepo;
    }

    public function getIndex()
    {
        return redirect()->route('dashboard.byPhase');
    }

    public function getByStatus()
    {
        return view('backend.dashboard.index')->with('page', 'backend-dashboard');
    }

    public function getByPhase(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $stat = $this->caseRepo->statisticByPhase($year);

        return view('backend.dashboard.byPhase', compact('stat'))->with('page', 'backend-dashboard');
    }

    public function getByJaksa()
    {
        return view('backend.dashboard.index')->with('page', 'backend-dashboard');
    }

}
