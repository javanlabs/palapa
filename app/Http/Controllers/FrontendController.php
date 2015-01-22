<?php namespace App\Http\Controllers;

use App\Lookup\RepositoryInterface as LookupRepository;
use App\Menu\RepositoryInterface as MenuRepository;
use App\Sop\RepositoryInterface;
use Illuminate\Http\Request;
use App\Cases\RepositoryInterface as CasesRepository;
use App\Officer\RepositoryInterface as OfficerRepository;
use Illuminate\Support\Facades\File;

class FrontendController extends Controller {

    public function getIndex(MenuRepository $menuRepository, CasesRepository $caseRepository)
    {
        $menu = $menuRepository->all();
        $stat['active'] = $caseRepository->countActive();
        $stat['newToday'] = $caseRepository->countNewToday();
        $stat['newThisWeek'] = $caseRepository->countNewThisWeek();
        $stat['newThisMonth'] = $caseRepository->countNewThisMonth();
        $cases = $caseRepository->upcomingSidang();

        return view('frontend.index', compact('menu', 'stat', 'cases'));
    }

    public function getSearch(Request $request, CasesRepository $repository, RepositoryInterface $sop, LookupRepository $lookup)
    {
        $keyword = $request->get('q');
        $type = $request->get('type');

        $cases = $repository->search($keyword, $type);
        $phases = $sop->byType($type);

        $types = $lookup->lists('kasus');

        return view('frontend.search', compact('cases', 'phases', 'type', 'keyword', 'types'))->with('page', 'search')->with('keyword',$keyword);
    }

    public function getOfficer(OfficerRepository $officer)
    {
        $officers = $officer->jaksa();
        return view('frontend.officer', compact('officers'))->with('page', 'officer');
    }

    public function getSlide(CasesRepository $caseRepository)
    {
        $files = File::allFiles(base_path('public/vendor/slide/images/large'));
        $images = [];
        foreach($files as $file)
        {
            $images[] = asset('vendor/slide/images/large/' . $file->getFilename());
        }

        $cases = $caseRepository->upcomingSidang();

        return view('frontend.slide', compact('images', 'cases'));
    }

    public function getSlide2(CasesRepository $caseRepository)
    {
        $images = $videos = [];
        foreach(File::allFiles(base_path('public/upload/slide/images')) as $file)
        {
            $images[] = asset('upload/slide/images/' . $file->getFilename());
        }
        foreach(File::allFiles(base_path('public/upload/slide/videos')) as $file)
        {
            $videos[] = ['src' => [asset('upload/slide/videos/' . $file->getFilename())]];
        }

        $cases = $caseRepository->upcomingSidang();

        return view('frontend.slide2', compact('images', 'videos', 'cases'));
    }
}
