<?php namespace Eendonesia\Wilayah;

use Illuminate\Database\Eloquent\Model;

class Provinsi extends Model {

    protected $table = 'wilayah_provinsi';

    protected function kabupaten()
    {
        return $this->hasMany('Eendonesia\Wilayah\Kabupaten', 'id_provinsi');
    }
}
