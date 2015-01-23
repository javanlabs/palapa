<?php namespace App\Http\Controllers\Backend;

use App\FileManager\FileManager;
use App\Http\Requests;
use Illuminate\Http\Request;

class FilesController extends BackendController {


    /**
     * @var FileManager
     */
    private $fileManager;

    function __construct(FileManager $fileManager)
    {
        $this->fileManager = $fileManager;
    }

    public function index(Request $request)
    {
        $path = $request->get('path', '');
        $paths = $this->buildBreadcrumbs($path);
        $items = $this->fileManager->all($path);

        return view('backend.files.index', compact('items', 'paths'));
    }

    public function create()
    {
    }

    public function store()
    {

    }

    public function show($id)
    {
    }

    public function destroy($id)
    {
    }

    protected function buildBreadcrumbs($path)
    {
        $paths = explode('/', $path);

        $breadcrumbs = [
            route('backend.files.index', ['path' => ''])  => 'Home'
        ];

        $stack = '';
        foreach($paths as $segment)
        {
            $stack .= $segment . '/';
            $breadcrumbs[route('backend.files.index', ['path' => $stack])] = $segment;
        }

        return $breadcrumbs;
    }
}
