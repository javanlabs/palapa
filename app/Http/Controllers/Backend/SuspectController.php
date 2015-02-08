<?php namespace App\Http\Controllers\Backend;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Eendonesia\Wilayah\Kabupaten;
use Illuminate\Support\Facades\Event;
use Input, View;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Cases\RepositoryInterface;
use App\Cases\Suspects;
use App\Cases\SuspectsForm;
use App\Cases\Cases;


class SuspectController extends BackendController {

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

        return parent::__construct();
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
		$cities = ['' => '--Pilih Kota--'] + Kabupaten::lists('nama', 'id');
        $religions = $this->lookup->religions();
        $jenisKelamins = $this->lookup->jenisKelamins();
        $jenisTahanan = $this->lookup->jenisTahanan();
        $status = $this->lookup->statusTersangka();

        $case_id = Input::get('case_id');
		return view('backend.suspects.create', compact('jenisKelamins', 'cities', 'religions', 'jenisTahanan', 'status', 'case_id'));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(SuspectsForm $form)
	{
		$case = Cases::find($form->get('case_id'));
		$suspect = Suspects::create($form->all());
        Event::fire('suspect.created', [$case, $suspect]);
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
        $suspect = Suspects::findOrFail($id);

        return view('backend.suspects.show', compact('suspect'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$suspect = Suspects::findOrFail($id);
        $caseId = $suspect->getCase()->id;

		$cities = ['' => '--Pilih Kota--'] + Kabupaten::lists('nama', 'id');
		$religions = $this->lookup->religions();
		$jenisTahanan = $this->lookup->jenisTahanan();
        $jenisKelamins = $this->lookup->jenisKelamins();
		$status = $this->lookup->statusTersangka();

		return view('backend.suspects.edit', compact('suspect', 'cities', 'religions', 'jenisTahanan', 'jenisKelamins', 'status', 'caseId'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(SuspectsForm $form, $id)
	{
		$suspect = Suspects::findOrFail($id);
		$suspect->update($form->all());
        Event::fire('suspect.updated', [$suspect->getCase(), $suspect]);

		return redirect()->route('backend.cases.show', [$form->get('case_id')]);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
        $suspect = Suspects::findOrFail($id);
        $case = $suspect->getCase();
		$case->suspects()->detach([$id]);

        Event::fire('suspect.removed', [$suspect]);

		return redirect()->route('backend.cases.show', [$case->id]);
	}

}
