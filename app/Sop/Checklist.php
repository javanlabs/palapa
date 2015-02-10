<?php namespace App\Sop;

use App\AuditTrail\Loggable;
use App\AuditTrail\RevisionableTrait;
use App\Cases\Cases;
use Illuminate\Database\Eloquent\Model;

class Checklist extends Model implements Loggable{

    const DIRECTION_STAY = 'stay';
    const DIRECTION_PREV = 'prev';
    const DIRECTION_NEXT = 'next';
    const DIRECTION_FINISH = 'finish';
    const DIRECTION_SUSPEND = 'suspend';

    use RevisionableTrait;

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

    public function newPivot(Model $parent, array $attributes, $table, $exists)
    {
        if($parent instanceof Cases)
        {
            return new CaseChecklistPivot($parent, $attributes, $table, $exists);
        }
        return parent::newPivot($parent, $attributes, $table, $exists);
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

    public function getNumberFieldAttribute()
    {
        $relatedData = $this->getRelatedData();

        foreach($relatedData as $column)
        {
            // jika nama kolom diakhir "_number", diasumsikan ini adalah isian nomor
            if(substr($column['name'], 0 - strlen('_number')))
            {
                return $column['name'];
            }
        }

        return false;
    }

    protected function getColumnType($column)
    {
        if(substr($column, -5) == '_date')
        {
            return 'date';
        }

        return 'string';
    }

    public function getNameAttribute()
    {
        return $this->attributes['name'];
    }
}
