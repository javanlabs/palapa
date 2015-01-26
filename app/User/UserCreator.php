<?php namespace App\User;

use Illuminate\Support\Facades\App;

class UserCreator
{

    /**
     * @var UserRepository
     */
    private $moderator;

    function __construct()
    {
        $this->moderator = App::make('Eendonesia\Moderator\EloquentRepository');
    }

    public function createFromOfficer($data, $officer)
    {
        $group = $this->moderator->findGroupByName($officer->role);
        if($group)
        {
            $data['groups'][$group->id] = $group->id;
        }

        $user = $this->moderator->addUser($data);

        $officer->user_id = $user->id;
        $officer->save();

        return $user;
    }

    public function deleteFromOfficer($officer)
    {
        if($officer->user_id)
        {
            $this->moderator->deleteUser($officer->user_id);
            $officer->user_id = null;
            return $officer->save();
        }

        return false;
    }
}