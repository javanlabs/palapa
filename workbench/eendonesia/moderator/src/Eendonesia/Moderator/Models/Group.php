<?php namespace Eendonesia\Moderator\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model {

    use SoftDeletes;

    protected $table = 'acl_groups';

    protected $fillable = ['name', 'description'];

    public function users()
    {
        return $this->belongsToMany('User', 'acl_users_groups');
    }

    public function resources()
	{
	    return $this->belongsToMany('Eendonesia\Moderator\Models\Resource', 'acl_permissions');
	}

}
