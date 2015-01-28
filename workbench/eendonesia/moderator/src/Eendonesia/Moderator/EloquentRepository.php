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
        $user->groups()->sync(array_get($input, 'groups', []));

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

    public function resetOfficerPassword($officer)
    {
        if($officer->user)
        {
            return $this->resetPassword($officer->user);
        }

        return false;
    }

    public function resetPassword($user)
    {
        $newPassword = $this->generateReadablePassword(8, false);
        $user->password = Hash::make($newPassword);
        $user->save();

        return $newPassword;
    }

    // Generates a strong password of N length containing at least one lower case letter,
    // one uppercase letter, one digit, and one special character. The remaining characters
    // in the password are chosen at random from those four sets.
    //
    // The available characters in each set are user friendly - there are no ambiguous
    // characters such as i, l, 1, o, 0, etc. This, coupled with the $add_dashes option,
    // makes it much easier for users to manually type or speak their passwords.
    //
    // Note: the $add_dashes option will increase the length of the password by
    // floor(sqrt(N)) characters.
    function generateReadablePassword($length = 9, $add_dashes = false, $available_sets = 'luds')
    {
        $sets = array();
        if(strpos($available_sets, 'l') !== false)
            $sets[] = 'abcdefghjkmnpqrstuvwxyz';
        if(strpos($available_sets, 'u') !== false)
            $sets[] = 'ABCDEFGHJKMNPQRSTUVWXYZ';
        if(strpos($available_sets, 'd') !== false)
            $sets[] = '23456789';
        if(strpos($available_sets, 's') !== false)
            $sets[] = '!@#$%&*?';

        $all = '';
        $password = '';
        foreach($sets as $set)
        {
            $password .= $set[array_rand(str_split($set))];
            $all .= $set;
        }

        $all = str_split($all);
        for($i = 0; $i < $length - count($sets); $i++)
            $password .= $all[array_rand($all)];

        $password = str_shuffle($password);

        if(!$add_dashes)
            return $password;

        $dash_len = floor(sqrt($length));
        $dash_str = '';
        while(strlen($password) > $dash_len)
        {
            $dash_str .= substr($password, 0, $dash_len) . '-';
            $password = substr($password, $dash_len);
        }
        $dash_str .= $password;
        return $dash_str;
    }
}
