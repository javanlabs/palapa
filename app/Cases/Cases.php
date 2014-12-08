<?php namespace App\Cases;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cases extends Model {

    use SoftDeletes;

    protected $table = 'cases';

    protected $fillable = ['name'];

    public function pangkat()
    {
        return $this->belongsTo('App\Lookup\Lookup', 'pangkat_id');
    }

    public function jabatan()
    {
        return $this->belongsTo('App\Lookup\Lookup', 'jabatan_id');
    }

    public function getPangkatNameAttribute()
    {
        if($this->pangkat)
        {
            return $this->pangkat['name'];
        }

        return null;
    }

    public function getJabatanNameAttribute()
    {
        if($this->jabatan)
        {
            return $this->jabatan['name'];
        }

        return null;
    }
}
