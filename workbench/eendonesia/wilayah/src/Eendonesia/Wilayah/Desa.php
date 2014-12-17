<?php namespace Eendonesia\Wilayah;

use Illuminate\Database\Eloquent\Model;

class Desa extends Model {

    protected $table = 'wilayah_desa';

    protected function kecamatan()
    {
        return $this->belongsTo('Eendonesia\Wilayah\Kecamatan', 'id_kabupaten');
    }
}
