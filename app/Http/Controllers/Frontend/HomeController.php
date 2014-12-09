<?php namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Cases\RepositoryInterface as CasesRepository;
use App\Officer\RepositoryInterface as OfficerRepository;

class HomeController extends Controller {

	public function getSearch(Request $request, CasesRepository $repository)
	{
        $cases = $repository->search($request->get('q'), $request->get('type'));

		return view('frontend.search', compact('cases'))->with('page', 'search');
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
