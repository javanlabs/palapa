<?php namespace App\AuditTrail\Activity;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model {

    protected $table = 'log_activities';

    protected $fillable = ['subject_id', 'subject_type', 'predicate', 'object_id', 'object_type', 'note', 'parent_id'];

}