<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class Template extends Model {

    protected $table = 'templates';

    protected $fillable = ['title', 'content', 'case_type_id'];

    public function getFileAttribute()
    {
        $name = strtolower($this->short_title);
        return base_path('resources/views/template/' . $name . '.blade.php');
    }

    public static function optionsSelect($case_id){
    	$rows = Template::where('type_id','=',$case_id)->get();
    	$result = array();
    	foreach($rows as $row){
    		$result[$row->id] = $row->title;
    	}
    	return $result;
    }
}
