<?php namespace App\Http\Controllers\Backend;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Eendonesia\Wilayah\Kabupaten;
use Input, View;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Cases\RepositoryInterface;
use App\Cases\Suspects;
use App\Cases\Cases;


class SuspectController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	private $lookup;
	private $repo;
	function __construct(
        RepositoryInterface $repo,
        LookupRepository $lookup        
    )
    {
        $this->repo = $repo;
        View::share('page', '');
        $this->lookup = $lookup;
    }
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{		
		$cities = array_merge(array('0'=>'Pilih Kota'), Kabupaten::lists('nama', 'id'));
        $religions = $this->lookup->religions();
        $case_id = Input::get('case_id');
		return view('backend.suspects.create', compact('cities', 'religions', 'case_id'));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{		
		$case = Cases::find(Input::get('case_id'));
		$suspect = Suspects::create(Input::all());
		$case->suspects()->save($suspect);
		return redirect()->route('backend.cases.show', $case->id);

	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
