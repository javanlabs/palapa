<?php namespace Eendonesia\Moderator\Controllers;

use Eendonesia\Moderator\RepositoryInterface;
use Illuminate\Routing\Controller;
use Input;
use Eendonesia\Moderator\Models\User;

class RolesController extends Controller {

    /**
     * @type RepositoryInterface
     */
    private $repo;

    function __construct(RepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function index($userId = null)
    {
        $users = $this->repo->users();
        $groups = null;
        $selectedUser = null;
        $userGroups = [];

        if($userId)
        {
            $selectedUser = User::findOrFail($userId);
            $groups = $this->repo->groups();
            $userGroups = $selectedUser->groups()->lists('group_id');
        }

        return view('moderator::roles.index', compact('users', 'groups', 'selectedUser', 'userGroups'));
    }

    public function assign()
    {
        $id = Input::get('id');
        $this->repo->assignGroups($id, Input::get('groups'));

        return redirect()->route('moderator.roles.index', [$id]);
    }
}
