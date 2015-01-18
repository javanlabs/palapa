<?php namespace Eendonesia\Moderator\Controllers;

use Eendonesia\Moderator\RepositoryInterface;
use Illuminate\Routing\Controller;
use Input;

class PermissionsController extends Controller {

    /**
     * @type RepositoryInterface
     */
    private $repo;

    function __construct(RepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function index($groupId = null)
    {
        $groups = $this->repo->groups();
        $resources = null;
        $selectedGroup = null;
        $groupResources = [];

        if($groupId)
        {
            $selectedGroup = $this->repo->findGroupById($groupId);
            $resources = $this->repo->resources();
            $groupResources = $selectedGroup->resources()->lists('resource_id');
        }

        return view('moderator::permissions.index', compact('groups', 'resources', 'selectedGroup', 'groupResources'));
    }

    public function assign()
    {
        $id = Input::get('id');
        $this->repo->assignPermissions($id, Input::get('groups'));

        return redirect()->route('moderator.permissions.index', [$id]);
    }
}
