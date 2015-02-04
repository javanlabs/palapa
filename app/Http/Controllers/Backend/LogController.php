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

    public function index()
    {
        $logs = $this->repo->paginate();
        return view('backend.log.index', compact('logs'));
    }

}
