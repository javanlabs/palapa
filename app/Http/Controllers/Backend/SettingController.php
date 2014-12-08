<?php namespace App\Http\Controllers\Backend;

class SettingController extends BackendController {

    public function getIndex()
    {
        return view('backend.setting.index')->with('page', 'backend-setting');
    }

}
