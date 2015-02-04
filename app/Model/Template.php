<?php namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use DB;

class Template extends Model {

    protected $table = 'templates';

    protected $fillable = ['title', 'content', 'case_type_id', 'checklist_id'];

    public function getCaseAttribute(){
        switch($this->case_type_id){
            case 201:
                return 'PIDUM';
            case 202:
                return 'PIDSUS';

        }
    }

    public function checklist()
    {
        return $this->belongsTo('App\Sop\Checklist', 'checklist_id');
    }

    public function getFileAttribute()
    {
        $name = strtolower($this->short_title);
        $type = $this->case_type_id;
        return base_path('resources/views/template/' . $type . '/' . $name . '.blade.php');
    }

    public function scopeByCaseType($query, $type)
    {
        return $query->where('case_type_id', '=', $type);
    }

    public static function optionsSelect($case_id){
    	$rows = Template::where('type_id','=',$case_id)->get();
    	$result = array();
    	foreach($rows as $row){
    		$result[$row->id] = $row->title;
    	}
    	return $result;
    }

    public function getNameAttribute()
    {
        return $this->short_title . ' ' . $this->title;
    }
}
