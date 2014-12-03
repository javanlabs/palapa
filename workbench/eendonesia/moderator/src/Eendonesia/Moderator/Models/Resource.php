<?php namespace Eendonesia\Moderator\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model {

    protected $table = 'acl_resources';

    protected $fillable = ['name', 'description'];

    public function groups()
	{
	    return $this->belongsToMany('Eendonesia\Moderator\Models\Group', 'acl_permissions');
	}

}
