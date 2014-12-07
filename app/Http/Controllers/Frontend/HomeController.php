<?php namespace App\Http\Controllers\Frontend;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class HomeController extends Controller {

	public function getIndex()
	{
		return redirect()->route('frontend.search');
	}

	public function getSearch()
	{
		return view('frontend.search')->with('page', 'case');
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
