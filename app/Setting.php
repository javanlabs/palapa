<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model {

	public $timestamps = false;

    protected $table = 'settings';

    protected $primaryKey = 'key';

    protected $fillable = ['key', 'value'];

    public function saveAll($data)
    {
        foreach($data as $key => $value)
        {
            $this->updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return true;
    }
}
