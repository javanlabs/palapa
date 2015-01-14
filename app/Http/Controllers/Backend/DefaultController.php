<?php namespace App\Http\Controllers\Backend;


class DefaultController extends BackendController {


    public function getIndex()
    {
        return view('backend.default.index');
    }

}
