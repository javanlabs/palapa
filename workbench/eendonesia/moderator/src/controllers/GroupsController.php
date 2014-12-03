<?php namespace Eendonesia\Moderator\Controllers;

use Eendonesia\Moderator\FormRequests\Group;
use Eendonesia\Moderator\RepositoryInterface;
use Illuminate\Routing\Controller as Controller;

class GroupsController extends Controller {

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
        $groups = $this->repo->groups();
        return view('moderator::groups.index', compact('groups'));
    }

    public function create()
    {
        return view('moderator::groups.create');
    }

    public function store(Group $form)
    {
        $this->repo->addGroup($form->only('name', 'description'));

        return redirect()->route('moderator.groups.index');
    }

    public function edit($id)
    {
        $group = $this->repo->findGroupById($id);
        return view('moderator::groups.edit', compact('group'));
    }

    public function update(Group $form, $id)
    {
        $this->repo->updateGroup($id, $form->only('name', 'description'));

        return redirect()->route('moderator.groups.index');
    }

    public function destroy($id)
    {
        $this->repo->deleteGroup($id);

        return redirect()->route('moderator.groups.index');
    }
}
