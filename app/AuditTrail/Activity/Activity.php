<?php namespace App\AuditTrail\Activity;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model {

    protected $table = 'log_activities';

    protected $fillable = ['case_id', 'subject_id', 'subject_type', 'predicate', 'object_id', 'object_type', 'note', 'parent_id'];

    public function cases()
    {
        return $this->belongsTo('App\Cases\Cases', 'case_id')->withTrashed();
    }

    public function subject()
    {
        return $this->morphTo('subject', 'subject_type', 'subject_id')->withTrashed();
    }

    public function object()
    {
        return $this->morphTo('object', 'object_type', 'object_id')->withTrashed();
    }

    public function revisions()
    {
        return $this->hasMany('App\AuditTrail\Revision', 'activity_id');
    }

    public function getSubjectNameAttribute()
    {
        if($this->subject)
        {
            return $this->subject->name;
        }

        return null;
    }

    public function getObjectNameAttribute()
    {
        if($this->object)
        {
            return $this->object->name;
        }

        return null;

    }

    public function getTimeForHumanAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function getPermalinkAttribute()
    {
        return route('backend.log.show', [$this->id]);
    }
}