<?php namespace App\Sop;

use Illuminate\Database\Eloquent\Model;

class Checklist extends Model {

    const DIRECTION_STAY = 'stay';
    const DIRECTION_PREV = 'prev';
    const DIRECTION_NEXT = 'next';
    const DIRECTION_FINISH = 'finish';
    const DIRECTION_SUSPEND = 'suspend';

    protected $table = 'sop_checklist';

    public function phase()
    {
        return $this->belongsTo('App\Sop\Phase', 'phase_id');
    }

    public function ticker()
    {
        return $this->belongsTo('App\Sop\Checklist', 'ticker_id');
    }

    public function templates(){
    	return $this->hasMany('App\Model\Template','checklist_id');
    }

    public function getIsNextAttribute()
    {
        return $this->direction == self::DIRECTION_NEXT;
    }

    public function getIsPrevAttribute()
    {
        return $this->direction == self::DIRECTION_PREV;
    }

    public function getIsFinishAttribute()
    {
        return $this->direction == self::DIRECTION_FINISH;
    }

    public function getIsSuspendAttribute()
    {
        return $this->direction == self::DIRECTION_SUSPEND;
    }

    public function getIsFirstAttribute()
    {
        return $this->ordinal == 1;
    }

    public static function availableChecklists(){
    	$rows = Checklist::all();
    	$result = array();
    	foreach($rows as $row){
    		$result[$row->id] = $row->name;
    	}
    	return $result;
    }

    public function getRelatedData()
    {
        if($this->related_data)
        {
            $data = json_decode($this->related_data);
            $columns = [];
            
            foreach($data as $column)
            {
                $item['name'] = $column;
                $item['type'] = $this->getColumnType($column);

                $columns[] = $item;
            }

            return $columns;
        }

        return [];
    }

    protected function getColumnType($column)
    {
        if(substr($column, -5) == '_date')
        {
            return 'date';
        }

        return 'string';
    }
}
