<?php namespace Eendonesia\Moderator;


trait RoleTrait
{
    public function groups()
    {
        return $this->belongsToMany('Eendonesia\Moderator\Models\Group', 'acl_users_groups');
    }
}
