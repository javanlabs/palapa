<?php namespace App\Http\Controllers\Frontend;

use App\Lookup\Lookup;
use App\Officer\Officer;
use App\Sop\RepositoryInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Cases\RepositoryInterface as CasesRepository;
use App\Officer\RepositoryInterface as OfficerRepository;

class HomeController extends Controller {

    public function getIndex()
    {
        return redirect()->route('frontend.search');
    }

	public function getSearch(Request $request, CasesRepository $repository, RepositoryInterface $sop, $type='pidum')
	{
		//dd($type);

		$keyword = null;
        if($request->get('type') == 'jaksa'){
        	$jaksa = Officer::findOrFail($request->get('q'));
        	if($jaksa)
        		$keyword = $jaksa->name;
        }

		$keyword = $request->get('q');

        $cases = $repository->search($keyword, $type);
        $phases = $sop->all();

		return view('frontend.search', compact('cases', 'phases', 'type', 'keyword'))->with('page', 'search')->with('keyword',$keyword);
	}

	public function getOrganization()
	{
		return view('frontend.organization')->with('page', 'organization');
	}

	public function getOfficer(OfficerRepository $officer)
	{
        $officers = $officer->all();
		return view('frontend.officer', compact('officers'))->with('page', 'officer');
	}

	public function getProfile()
	{
		return view('frontend.profile')->with('page', 'profile');
	}
}
