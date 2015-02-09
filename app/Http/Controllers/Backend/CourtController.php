<?php namespace App\Http\Controllers\Backend;

use App\Http\Requests;
use Eendonesia\Wilayah\Kabupaten;
use App\Lookup\RepositoryInterface as LookupRepository;
use App\Cases\RepositoryInterface;
use App\Cases\Court\Court;
use App\Cases\Court\CourtForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;


class CourtController extends BackendController {

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
        $this->lookup = $lookup;

        return parent::__construct();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create(Request $request)
    {
        $case = $this->repo->find($request->get('case_id'));
        return view('backend.court.create', compact('case'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(CourtForm $form)
    {
        $case = $this->repo->find($form->get('case_id'));

        $court = Court::create($form->all());
        Event::fire('court.created', [$case, $court]);

        $case->courts()->save($court);
        return redirect()->route('backend.cases.show', $case->id);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $court = Court::findOrFail($id);
        $case = $court->cases;

        return view('backend.court.edit', compact('court', 'case'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(CourtForm $request, $id)
    {
        $court = Court::findOrFail($id);
        $court->update($request->all());
        Event::fire('court.updated', [$court->cases, $court]);

        return redirect()->route('backend.cases.show', [$court->case_id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $court = Court::findOrFail($id);
        $court->delete();
        Event::fire('court.deleted', [$court->cases, $court]);

        return redirect()->route('backend.cases.show', [$court->case_id]);
    }

}
