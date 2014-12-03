<?php namespace Eendonesia\Moderator;

interface RepositoryInterface {

    public function groups();

    public function findGroupById($id);

    public function addGroup($input);

    public function updateGroup($id, $input);

    public function deleteGroup($id);

    public function resources();

    public function findResourceById($id);

    public function addResource($input);

    public function updateResource($id, $input);

    public function deleteResource($id);

    public function assignGroups($userId, $group);

    public function assignPermissions($groupId, $resources);

}
