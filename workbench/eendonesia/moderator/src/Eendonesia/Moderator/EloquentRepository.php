<?php namespace Eendonesia\Moderator;

use Eendonesia\Moderator\Models\User;
use Eendonesia\Moderator\Models\Group;
use Eendonesia\Moderator\Models\Resource;
use Illuminate\Support\Facades\Hash;

class EloquentRepository implements RepositoryInterface{

    /**
     * @type User
     */
    private $user;

    /**
     * @type Group
     */
    private $group;

    /**
     * @type Resource
     */
    private $resource;

    function __construct(User $user, Group $group, Resource $resource)
    {
        $this->user = $user;
        $this->group = $group;
        $this->resource = $resource;
    }

    public function users()
    {
        return $this->user->all();
    }

    public function usersByGroups($groups)
    {
        $groups = (array) $groups;

        return $this->user->whereHas('groups', function($q) use ($groups) {
            return $q->whereIn('name', $groups);
        });
    }

    public function findUserById($id)
    {
        return $this->user->findOrFail($id);
    }

    public function addUser($input)
    {
        $input['password'] = Hash::make($input['password']);
        $user = $this->user->create($input);
        $user->groups()->sync(array_get($input, 'groups'));

        return $user;
    }

    public function updateUser($id, $input)
    {
        $user = $this->user->findOrFail($id);
        $saved = $user->update($input);

        if($saved)
        {
            $user->groups()->sync(array_get($input, 'groups'));
        }

        return $user;
    }

    public function deleteUser($id)
    {
        return $this->user->findOrFail($id)->delete();
    }

    public function groups()
    {
        return $this->group->all();
    }

    public function findGroupById($id)
    {
        return $this->group->findOrFail($id);
    }

    public function findGroupByName($name)
    {
        return $this->group->whereName($name)->first();
    }

    public function addGroup($input)
    {
        return $this->group->create($input);
    }

    public function updateGroup($id, $input)
    {
        return $this->group->findOrFail($id)->update($input);
    }

    public function deleteGroup($id)
    {
        return $this->group->findOrFail($id)->delete();
    }

    public function resources()
    {
        return $this->resource->all();
    }

    public function findResourceById($id)
    {
        return $this->resource->findOrFail($id);
    }

    public function addResource($input)
    {
        return $this->resource->create($input);
    }

    public function updateResource($id, $input)
    {
        return $this->resource->findOrFail($id)->update($input);
    }

    public function deleteResource($id)
    {
        return $this->resource->findOrFail($id)->delete();
    }

    public function assignGroups($userId, $groups)
    {
        $this->user->findOrFail($userId)->groups()->sync((array) $groups);
    }

    public function assignPermissions($groupId, $resources)
    {
        $this->group->findOrFail($groupId)->resources()->sync((array) $resources);
    }
}
