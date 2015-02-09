<?php namespace App\Cases;

use App\AuditTrail\Loggable;
use App\AuditTrail\RevisionableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model implements Loggable{

    use RevisionableTrait, SoftDeletes;

	protected $table = 'cases_documents';

    protected $fillable = ['title', 'content'];

    public function cases()
    {
        return $this->belongsTo('App\Cases\Cases', 'case_id');
    }

    public function template()
    {
        return $this->belongsTo('App\Model\Template', 'template_id');
    }

    public function getNameAttribute()
    {
        return $this->title;
    }
}
?>
