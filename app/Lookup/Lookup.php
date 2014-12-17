<?php namespace App\Lookup;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lookup extends Model {

    const TYPE_PANGKAT = 'pangkat';
    const TYPE_JABATAN = 'jabatan';
    const TYPE_KASUS = 'kasus';

    use SoftDeletes;

    protected $table = 'lookups';

    protected $fillable = ['name', 'type'];

}
