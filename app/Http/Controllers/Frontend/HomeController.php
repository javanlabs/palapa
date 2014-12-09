<?php namespace App\Http\Controllers\Frontend;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Cases\RepositoryInterface;

class HomeController extends Controller {

	public function getSearch(Request $request, RepositoryInterface $repository)
	{
        $cases = $repository->search($request->get('q'), $request->get('type'));
        $histories = $repository->histories(1);

		return view('frontend.search', compact('cases', 'histories'))->with('page', 'search');
	}

	public function getOrganization()
	{
		return view('frontend.organization')->with('page', 'organization');
	}

	public function getOfficer()
	{
		return view('frontend.officer')->with('page', 'officer');
	}

	public function getProfile()
	{
		return view('frontend.profile')->with('page', 'profile');
	}
}
