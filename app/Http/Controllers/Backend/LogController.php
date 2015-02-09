<?php namespace App\Http\Controllers\Backend;

use App\AuditTrail\Activity\RepositoryInterface;
use Illuminate\Http\Request;

class LogController extends BackendController {


    /**
     * @var
     */
    private $repo;

    function __construct(RepositoryInterface $repo)
    {
        $this->repo = $repo;

        parent::__construct();
    }

    public function index(Request $request)
    {
        $logs = $this->repo->paginate($request->get('q'));
        return view('backend.log.index', compact('logs'));
    }

    public function show($id)
    {
        $log = $this->repo->find($id);
        $revisions = $log->revisions;
        return view('backend.log.show', compact('log', 'revisions'));
    }
}
