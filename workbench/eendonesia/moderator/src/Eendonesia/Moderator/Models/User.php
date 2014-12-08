<?php namespace Eendonesia\Moderator\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model {

    use SoftDeletes;

    protected $table = 'users';

    protected $fillable = ['name', 'email', 'password'];

    public function groups()
    {
        return $this->belongsToMany('Eendonesia\Moderator\Models\Group', 'acl_users_groups');
    }
}
