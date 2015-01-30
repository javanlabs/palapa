<?php namespace App\Http\Controllers\Backend;


use Eendonesia\Moderator\FormRequests\UpdatePassword;
use Eendonesia\Moderator\RepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MeController extends BackendController {


    function __construct()
    {
        return parent::__construct();
    }

    public function index()
    {
        $user = Auth::user();

        return view('backend.me.profile', compact('user'));
    }

    public function updatePassword(UpdatePassword $form, RepositoryInterface $moderator)
    {
        $moderator->updatePassword(Auth::user()->id, $form->get('password'));
        return redirect()->route('me.profile')->with('flash.success', 'Password berhasil diperbarui');
    }

}
