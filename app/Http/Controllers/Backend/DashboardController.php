<?php namespace App\Http\Controllers\Backend;

use App\Cases\Cases;
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
    /**
     * @type \App\Lookup\RepositoryInterface
     */
    private $lookup;

    function __construct(RepositoryInterface $caseRepo, \App\Officer\RepositoryInterface $officerRepo, \App\Lookup\RepositoryInterface $lookup)
    {
        $this->caseRepo = $caseRepo;
        $this->officerRepo = $officerRepo;
        $this->lookup = $lookup;
    }

    public function getIndex()
    {
        return redirect()->route('dashboard.byPhase');
    }

    public function getByStatus(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $stat = $this->caseRepo->statisticByStatus($year);

        return view('backend.dashboard.byStatus', compact('stat', 'year'));
    }

    public function getByPhase(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $type = $request->get('type', 201);

        $stat = $this->caseRepo->statisticByPhase($year, $type);
        $types = $this->lookup->lists('kasus');

        return view('backend.dashboard.byPhase', compact('stat', 'types', 'year', 'type'));
    }

    public function getByJaksa(Request $request)
    {
        $officers = $this->officerRepo->jaksaByCase();
        $year = $request->get('year', date('Y'));

        return view('backend.dashboard.byJaksa', compact('officers', 'year'));
    }

    public function getPidumByCategory(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $stat = $this->caseRepo->statisticByCategory($year, Cases::TYPE_PIDUM);

        return view('backend.dashboard.pidumByCategory', compact('stat', 'year'));
    }
}
