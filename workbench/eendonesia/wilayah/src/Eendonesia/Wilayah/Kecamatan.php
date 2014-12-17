<?php namespace Eendonesia\Wilayah;

use Illuminate\Database\Eloquent\Model;

class Kecamatan extends Model {

    protected $table = 'wilayah_kecamatan';

    protected function desa()
    {
        return $this->hasMany('Eendonesia\Wilayah\Desa', 'id_kecamatan');
    }

    protected function kabupaten()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Kabupaten', 'id_kabupaten');
    }
}
