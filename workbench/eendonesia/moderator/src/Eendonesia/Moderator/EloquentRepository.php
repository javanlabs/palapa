<?php namespace Eendonesia\Moderator;

use Eendonesia\Moderator\Models\Group;
use Eendonesia\Moderator\Models\Resource;
use Illuminate\Support\Facades\Config;

class EloquentRepository implements RepositoryInterface{

    /**
     * @type Group
     */
    private $group;

    /**
     * @type Resource
     */
    private $resource;

    function __construct(Group $group, Resource $resource)
    {
        $this->group = $group;
        $this->resource = $resource;

        $userClass = Config::get('auth.model');
        $this->user = new $userClass;
    }

    public function groups()
    {
        return $this->group->all();
    }

    public function findGroupById($id)
    {
        return $this->group->findOrFail($id);
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
