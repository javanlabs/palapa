<?php namespace App\Cases;

use Illuminate\Database\Eloquent\Model;

class Document extends Model {
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
}
?>
