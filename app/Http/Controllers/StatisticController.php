<?php namespace App\Http\Controllers;

use App\Cases\RepositoryInterface;
use Illuminate\Http\Request;
use Eendonesia\Skrip\Post\RepositoryInterface as PostRepository;

class StatisticController extends Controller {

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

    private $postRepo;

    function __construct(RepositoryInterface $caseRepo, \App\Officer\RepositoryInterface $officerRepo, \App\Lookup\RepositoryInterface $lookup, PostRepository $postRepo)
    {
        $this->caseRepo = $caseRepo;
        $this->officerRepo = $officerRepo;
        $this->lookup = $lookup;
        $this->postRepo = $postRepo;
    }

    public function index(Request $request)
    {
        return redirect()->route('statistic.byPhase', ['type' => $request->get('type')]);
    }

    public function byStatus(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $type = $request->get('type', null);

        $stat = $this->caseRepo->statisticByStatus($year, $type);
        $allPostInCategory = $this->postRepo->getByPosition($type);

        return view('frontend.statistic.byStatus', compact('stat', 'year', 'type', 'allPostInCategory'));
    }

    public function byPhase(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $type = $request->get('type', 201);

        $stat = $this->caseRepo->statisticByPhase($year, $type);
        $types = $this->lookup->lists('kasus');
        $allPostInCategory = $this->postRepo->getByPosition($type);

        return view('frontend.statistic.byPhase', compact('stat', 'types', 'year', 'type', 'allPostInCategory'));
    }

    public function byJaksa(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $type = $request->get('type', null);

        $officers = $this->officerRepo->jaksaByCase($type);
        $allPostInCategory = $this->postRepo->getByPosition($type);

        return view('frontend.statistic.byJaksa', compact('officers', 'year', 'type', 'allPostInCategory'));
    }

    public function byCategory(Request $request)
    {
        $year = $request->get('year', date('Y'));
        $type = $request->get('type', null);

        $stat = $this->caseRepo->statisticByCategory($year, $type);
        $allPostInCategory = $this->postRepo->getByPosition($type);

        return view('frontend.statistic.byCategory', compact('stat', 'year', 'type', 'allPostInCategory'));
    }
}
