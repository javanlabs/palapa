<?php namespace Eendonesia\Moderator\Controllers;

use Eendonesia\Moderator\FormRequests\User;
use Eendonesia\Moderator\RepositoryInterface;
use Illuminate\Routing\Controller as Controller;

class UsersController extends Controller {

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
        $users = $this->repo->users();
        return view('moderator::users.index', compact('users'));
    }

    public function create()
    {
        $groups = $this->repo->groups();
        return view('moderator::users.create', compact('groups'));
    }

    public function store(User $form)
    {
        $this->repo->addUser($form->all());

        return redirect()->route('moderator.users.index')->with('flash.success', 'User berhasil ditambah');
    }

    public function edit($id)
    {
        $user = $this->repo->findUserById($id);
        $userGroups = $user->groups()->lists('id');
        $groups = $this->repo->groups();

        return view('moderator::users.edit', compact('user', 'groups', 'userGroups'));
    }

    public function update(User $form, $id)
    {
        $this->repo->updateUser($id, $form->only('email', 'name', 'groups'));
        return redirect()->route('moderator.users.index')->with('flash.success', 'Data user berhasil diperbarui');
    }

    public function destroy($id)
    {
        $this->repo->deleteUser($id);

        return redirect()->route('moderator.users.index')->with('flash.success', 'User telah berhasil dihapus');
    }

    public function resetPassword($id)
    {
        $user = $this->repo->findUserById($id);
        $password = $this->repo->resetPassword($user);

        return json_encode(['status' => 1, 'password' => $password]);
    }
}
