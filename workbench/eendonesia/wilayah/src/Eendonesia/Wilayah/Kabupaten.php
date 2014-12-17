<?php namespace Eendonesia\Wilayah;

use Illuminate\Database\Eloquent\Model;

class Kabupaten extends Model {

    protected $table = 'wilayah_kabupaten';

    protected function kecamatan()
    {
        return $this->hasMany('Eendonesia\Wilayah\Kecamatan', 'id_kabupaten');
    }

    protected function provinsi()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Provinsi', 'id_provinsi');
    }
}
