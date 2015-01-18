<?php namespace Eendonesia\Moderator\Controllers;

use Eendonesia\Moderator\FormRequests\Resource;
use Eendonesia\Moderator\RepositoryInterface;
use Illuminate\Routing\Controller as Controller;

class ResourcesController extends Controller {

    /**
     * @type RepositoryInterface
     */
    private $repo;

    function __construct(RepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function index()
    {
        $resources = $this->repo->resources();
        return view('moderator::resources.index', compact('resources'));
    }

    public function create()
    {
        return view('moderator::resources.create');
    }

    public function store(Resource $form)
    {
        $this->repo->addResource($form->only('name', 'description'));

        return redirect()->route('moderator.resources.index');
    }

    public function edit($id)
    {
        $resource = $this->repo->findResourceById($id);
        return view('moderator::resources.edit', compact('resource'));
    }

    public function update(Resource $form, $id)
    {
        $this->repo->updateResource($id, $form->only('name', 'description'));

        return redirect()->route('moderator.resources.index');
    }

    public function destroy($id)
    {
        $this->repo->deleteResource($id);

        return redirect()->route('moderator.resources.index');
    }
}
