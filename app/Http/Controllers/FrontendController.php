<?php namespace App\Http\Controllers;

use App\Cases\Court\Court;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Menu\RepositoryInterface as MenuRepository;
use App\Sop\RepositoryInterface;
use Carbon\Carbon;
use Eendonesia\Skrip\Post\EloquentRepository;
use Eendonesia\Skrip\Post\RepositoryInterface as PostRepository;
use Illuminate\Http\Request;
use App\Cases\RepositoryInterface as CasesRepository;
use App\Officer\RepositoryInterface as OfficerRepository;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Input;

class FrontendController extends Controller {

    public function getIndex(MenuRepository $menuRepository, CasesRepository $caseRepository)
    {
        $menu = $menuRepository->all();
        $stat['active'] = $caseRepository->countActive();
        $stat['newToday'] = $caseRepository->countNewToday();
        $stat['newThisWeek'] = $caseRepository->countNewThisWeek();
        $stat['newThisMonth'] = $caseRepository->countNewThisMonth();
        $cases = $caseRepository->upcomingSidang();
        $courts = Court::with('cases')->upcoming()->get();

        return view('frontend.index', compact('menu', 'stat', 'cases', 'courts'));
    }

    public function getSearch(Request $request, CasesRepository $repository, RepositoryInterface $sop, LookupRepository $lookup, PostRepository $postRepo)
    {
        $keyword = $request->get('q');
        $type = $request->get('type');

        $cases = $repository->search($keyword, $type);
        $phases = $sop->byType($type);

        $types = $lookup->lists('kasus');

        $allPostInCategory = $postRepo->getByPosition($type);
        $position = $type;

        return view('frontend.search', compact('cases', 'phases', 'type', 'keyword', 'types', 'allPostInCategory', 'position'))->with('page', 'search')->with('keyword',$keyword);
    }

    public function getPost(PostRepository $postRepo, LookupRepository $lookup, $id)
    {
        $post = $postRepo->find($id);
        $allPostInCategory = $postRepo->getByPosition($post->position);
        $type = $post->position;
        $types = $lookup->lists('kasus');

        return view('frontend.postByCaseType', compact('allPostInCategory', 'post', 'type', 'types', 'id'));
    }

    public function getOfficer(OfficerRepository $officer)
    {
        $officers = $officer->jaksa();
        return view('frontend.officer', compact('officers'))->with('page', 'officer');
    }

    public function getSidang(Request $request)
    {
        $date = $request->get('date');
        $dateForHuman = null;

        if($date)
        {
            $dateForHuman = Carbon::createFromFormat('d-m-Y', $date)->formatLocalized('%A, %d %B %Y');
        }

        $courts = Court::with('cases')->upcoming()->byDate($date)->get();

        return view('frontend.sidang', compact('courts', 'date', 'dateForHuman'));
    }

    public function getCase(CasesRepository $caseRepository, RepositoryInterface $sopRepo, $id)
    {
        $case = $caseRepository->find($id);
        $phases = $sopRepo->byType($case->type_id);
        $activities = $caseRepository->activities($case);
        $suspects = $case->suspects;
        $courts = $case->courts;

        return view('frontend.case', compact('case', 'phases', 'activities', 'suspects', 'courts'));

    }

    public function getSlide()
    {
        return redirect()->route('slide.image');
    }

    public function getSlideImage()
    {
        $images = [];
        foreach(File::allFiles(base_path('public/upload/slide/images')) as $file)
        {
            $info = getimagesize($file);
            $images[] = ['name' => $file->getFilename(), 'url' => asset('upload/slide/images/' . $file->getFilename()), 'width'=>$info[0], 'height' => $info[1]];
        }

        usort($images, function($a, $b){
            return $a['name'] > $b['name'];
        });

        return view('frontend.slide.image', compact('images'));
    }

    public function getSlideScroll()
    {
        $images = [];
        foreach(File::allFiles(base_path('public/upload/slide/scroll')) as $file)
        {
            $info = getimagesize($file);
            $images[] = ['name' => $file->getFilename(), 'url' => asset('upload/slide/scroll/' . $file->getFilename()), 'width'=>$info[0], 'height' => $info[1]];
        }

        usort($images, function($a, $b){
            return $a['name'] > $b['name'];
        });

        return view('frontend.slide.scroll', compact('images'));
    }

    public function getSlideVideo()
    {
        $videos = [];
        foreach(File::allFiles(base_path('public/upload/slide/videos')) as $file)
        {
            $videos[] = ['src' => [asset('upload/slide/videos/' . $file->getFilename())]];
        }

        if(empty($videos))
        {
            return redirect()->route('slide.image');
        }
        natsort($videos);
        return view('frontend.slide.video', compact('videos'));
    }

    public function getSlideSidang()
    {
        $courts = Court::with('cases')->upcoming()->get();

        return view('frontend.slide.sidang', compact('courts'));
    }

    public function getSlide4(CasesRepository $caseRepository)
    {
        $images = $videos = [];
        foreach(File::allFiles(base_path('public/upload/slide/images')) as $file)
        {
            $images[] = asset('upload/slide/images/' . $file->getFilename());
        }
        natsort($images);

        $cases = $caseRepository->upcomingSidang();

        return view('frontend.slide4', compact('images', 'cases'));
    }

    public function getSlide5(CasesRepository $caseRepository)
    {
        $images = $videos = [];
        foreach(File::allFiles(base_path('public/upload/slide/images')) as $file)
        {
            $images[] = asset('upload/slide/images/' . $file->getFilename());
        }
        natsort($images);

        $cases = $caseRepository->upcomingSidang();

        return view('frontend.slide5', compact('images', 'cases'));
    }
}
