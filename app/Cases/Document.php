<?php namespace App\Cases;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model {
	protected $table = 'cases_documents';

    protected $fillable = ['title', 'content'];
}
?>