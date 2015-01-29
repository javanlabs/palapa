<?php namespace App;

use Eendonesia\Moderator\RoleTrait;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword, RoleTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password', 'remember_token'];

    public function groups()
    {
        return $this->belongsToMany('Eendonesia\Moderator\Models\Group', 'acl_users_groups', 'user_id', 'group_id');
    }

    public function officer()
    {
        return $this->hasOne('App\Officer\Officer');
    }

    public function hasGroup($name)
    {
        foreach($this->groups as $group)
        {
            if($group->name == $name)
            {
                return true;
            }
        }

        return false;
    }

    public function getCanManagePidumAttribute()
    {
        return $this->hasGroup('pidum') || $this->hasGroup('root');
    }

    public function getCanManagePidsusAttribute()
    {
        return $this->hasGroup('pidsus') || $this->hasGroup('root');
    }

    public function canManage($case)
    {
        $isCaseCreator = $case->author_id == $this->id;
        $isCaseStaff = $case->staff_id == ($this->officer?$this->officer->id:'-');
        $isCaseJaksa = $case->jaksa_id == ($this->officer?$this->officer->id:'-');
        
        return $this->hasGroup('root') || $isCaseCreator || $isCaseStaff || $isCaseJaksa;
    }
}
