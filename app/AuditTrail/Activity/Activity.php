<?php namespace App\AuditTrail\Activity;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model {

    protected $table = 'log_activities';

    protected $fillable = ['subject_id', 'subject_type', 'predicate', 'object_id', 'object_type', 'note', 'parent_id'];

    public function subject()
    {
        return $this->morphTo('subject', 'subject_type', 'subject_id')->withTrashed();
    }

    public function object()
    {
        return $this->morphTo('object', 'object_type', 'object_id')->withTrashed();
    }

    public function getTimeForHumanAttribute()
    {
        return $this->created_at->diffForHumans();
    }

}