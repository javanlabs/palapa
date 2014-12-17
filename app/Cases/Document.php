<?php namespace App\Cases;

use Illuminate\Database\Eloquent\Model;

class Document extends Model {
	protected $table = 'cases_documents';

    protected $fillable = ['title', 'content'];
}
?>
