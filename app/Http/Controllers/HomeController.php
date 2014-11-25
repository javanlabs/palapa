<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Cause\RepositoryInterface;
use Carbon\Carbon;

class HomeController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	$router->get('/', 'HomeController@showWelcome');
	|
	*/

	public function index(Request $request, RepositoryInterface $repository)
	{
        $cases = $repository->search($request->get('keyword'), $request->get('type'));
        $histories = $repository->histories(1);
		return view('hello', compact('cases', 'histories'));
	}

    public function statistic(Request $request, RepositoryInterface $repository)
    {
        $from = $request->get('from', Carbon::now()->subMonth()->format('Y-m-d'));
        $to = $request->get('to', Carbon::now()->format('Y-m-d'));

        $data = $repository->dailyCaseStatistic($request->get('from'), $request->get('to'));
        return view('statistic', compact('data', 'from', 'to'));
    }
}
