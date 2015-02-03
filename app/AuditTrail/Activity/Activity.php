<?php namespace App\AuditTrail\Activity;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model {

    protected $table = 'log_activities';

    protected $fillable = ['subject', 'predicate', 'object', 'note', 'parent_id'];

}