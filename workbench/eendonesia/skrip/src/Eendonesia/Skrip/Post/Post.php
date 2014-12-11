<?php namespace Eendonesia\Skrip\Post;

use Illuminate\Database\Eloquent\Model;
use DB;

class Post extends Model {

    protected $table = 'posts';

    protected $fillable = ['title', 'content', 'position', 'status'];

    public function author()
    {
        return $this->belongsTo('App\User', 'author_id');
    }

    public function getPossibleStatus(){
    	$type = DB::select( DB::raw("SHOW COLUMNS FROM $this->table WHERE Field = 'status'") )[0]->Type;
		preg_match('/^enum\((.*)\)$/', $type, $matches);
		$enum = array();
		foreach( explode(',', $matches[1]) as $value ){		
			$v = trim( $value, "'" );
			$enum = array_add($enum, $v, $v);
		}
		return $enum;
    }
	public function getPossiblePosition(){

    	$type = DB::select( DB::raw("SHOW COLUMNS FROM $this->table WHERE Field = 'position'") )[0]->Type;
		preg_match('/^enum\((.*)\)$/', $type, $matches);
		$enum = array();
		foreach( explode(',', $matches[1]) as $value ){		
			$v = trim( $value, "'" );
			$enum = array_add($enum, $v, $v);
		}
		return $enum;
    }
}
