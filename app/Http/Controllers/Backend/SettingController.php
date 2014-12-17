<?php namespace App\Http\Controllers\Backend;

use App\Setting;
use Illuminate\Http\Request;

class SettingController extends BackendController {

    public function index()
    {
        $setting = Setting::lists('value', 'key');
        return view('backend.setting.index', compact('setting'))->with('page', 'backend-setting');
    }

    public function store(Request $request)
    {
        with(new Setting())->saveAll($request->all());
        return redirect()->back();
    }
}
