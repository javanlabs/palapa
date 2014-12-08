<?php namespace App\Lookup;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lookup extends Model {

    use SoftDeletes;

    protected $table = 'lookups';

    protected $fillable = ['name', 'type'];

}
