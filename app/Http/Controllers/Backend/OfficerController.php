<?php namespace App\Http\Controllers\Backend;

class OfficerController extends BackendController {

    public function getIndex()
    {
        return view('backend.officer.index')->with('page', 'backend-officer');
    }

}
