<?php namespace App\Http\Controllers\Backend;

use App\Http\Requests;
use Eendonesia\Wilayah\Kabupaten;
use Illuminate\Support\Facades\Event;
use Input, View;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Cases\RepositoryInterface;
use App\Cases\Witness;
use App\Cases\WitnessForm;
use App\Cases\Cases;


class WitnessController extends BackendController {

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

        $case_id = Input::get('case_id');
		return view('backend.witness.create', compact('jenisKelamins', 'cities', 'religions', 'case_id'));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store(WitnessForm $form)
	{
		$case = Cases::find($form->get('case_id'));

		$witness = Witness::create($form->all());
        Event::fire('witness.created', [$witness]);
		$case->witness()->save($witness);
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
        $witness = Witness::findOrFail($id);

        return view('backend.witness.show', compact('witness'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$witness = Witness::findOrFail($id);
        $caseId = $witness->cases()->first()->id;

		$cities = ['' => '--Pilih Kota--'] + Kabupaten::lists('nama', 'id');
		$religions = $this->lookup->religions();
        $jenisKelamins = $this->lookup->jenisKelamins();

		return view('backend.witness.edit', compact('witness', 'cities', 'religions', 'jenisKelamins', 'caseId'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update(WitnessForm $form, $id)
	{
		$witness = Witness::findOrFail($id);
		$witness->update($form->all());
        Event::fire('witness.updated', [$witness]);

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
        $witness = Witness::findOrFail($id);
        $case = $witness->cases()->first();

		$case->witness()->detach([$id]);
        Event::fire('witness.removed', [$witness]);

		return redirect()->route('backend.cases.show', [$case->id]);
	}

}
