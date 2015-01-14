<?php namespace App\Http\Controllers\Backend;


use Illuminate\Support\Facades\Auth;

class DefaultController extends BackendController {


    public function getIndex()
    {
        if(!Auth::check())
        {
            return redirect()->route('gapura.login');
        }

        return view('backend.default.index');
    }

}
