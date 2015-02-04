<?php namespace App\Http\Controllers\Backend;

use App\Http\Requests;
use App\Cases\RepositoryInterface;
use App\Cases\Evidence\Evidence;
use App\Cases\Evidence\EvidenceForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;


class EvidenceController extends BackendController {

    private $repo;

    function __construct(RepositoryInterface $repo)
    {
        $this->repo = $repo;

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
        return view('backend.evidence.create', compact('case'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(EvidenceForm $form)
    {
        $case = $this->repo->find($form->get('case_id'));

        foreach($form->get('name') as $name)
        {
            if($name)
            {
                $evidence = Evidence::create(['name' => $name]);
                Event::fire('evidence.created', [$evidence]);
                $case->evidences()->save($evidence);
            }
        }

        return redirect()->route('backend.cases.show', $case->id)->with('flash.success', 'Barang bukti berhasil ditambahkan');

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        $evidence = Evidence::findOrFail($id);
        $case = $evidence->cases;

        return view('backend.evidence.edit', compact('evidence', 'case'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(EvidenceForm $request, $id)
    {
        $evidence = Evidence::findOrFail($id);
        $evidence->update($request->all());
        Event::fire('evidence.updated', [$evidence]);

        return redirect()->route('backend.evidences.show', [$evidence->case_id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $evidence = Evidence::findOrFail($id);
        $evidence->delete();
        Event::fire('evidence.deleted', [$evidence]);

        return redirect()->route('backend.cases.show', [$evidence->case_id])->with('flash.success', 'Data barang bukti berhasil dihapus');
    }

}
