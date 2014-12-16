<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class Template extends Model {

    protected $table = 'templates';

    protected $fillable = ['title', 'content', 'checklist_id'];

    public function author()
    {
        return $this->belongsTo('App\User', 'author_id');
    }    

    public function checklist()
    {
        return $this->belongsTo('App\Sop\Checklist', 'checklist_id');
    }

    public static function optionsSelect(){
    	$rows = Template::all();
    	$result = array();
    	foreach($rows as $row){
    		$result[$row->id] = $row->title;
    	}
    	return $result;
    }
}
