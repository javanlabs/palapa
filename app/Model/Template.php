<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class Template extends Model {

    protected $table = 'templates';

    protected $fillable = ['title', 'content'];

    public function author()
    {
        return $this->belongsTo('App\User', 'author_id');
    }    
}
