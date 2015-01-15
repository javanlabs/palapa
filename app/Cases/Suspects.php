<?php namespace App\Cases;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Suspects extends Model {

    protected $table = 'suspects';

    protected $fillable = ['type', 'name', 'pob', 'dob', 'age', 'religion', 'address', 'city_id', 'nationality', 'job', 'education', 'nama_pimpinan', 'tahanan', 'tgl_penahanan', 'status', 'sex'];

    // protected $dates = ['date'];

    public function cases()
    {
        return $this->belongsToMany('App\Cases\Cases');
    }

    public function addressCity()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Kabupaten', 'city_id');
    }    


    public function suspectPob()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Kabupaten', 'pob');
    }
}
