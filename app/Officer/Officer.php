<?php namespace App\Officer;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Officer extends Model {

    const ROLE_STAFF = 'staff';
    const ROLE_JAKSA = 'jaksa';

    use SoftDeletes;

    protected $table = 'officers';

    protected $fillable = ['name', 'nip', 'pangkat_id', 'jabatan_id', 'role'];

    public function pangkat()
    {
        return $this->belongsTo('App\Lookup\Lookup', 'pangkat_id');
    }

    public function jabatan()
    {
        return $this->belongsTo('App\Lookup\Lookup', 'jabatan_id');
    }

    public function cases()
    {
        return $this->hasMany('App\Cases\Cases', 'jaksa_id');
    }

    public function activeCases()
    {
        return $this->hasMany('App\Cases\Cases', 'jaksa_id')->whereNull('cases.finish_date')->published();
    }

    public function scopeStaff($query)
    {
        return $query->whereRole(self::ROLE_STAFF);
    }

    public function scopeJaksa($query)
    {
        return $query->whereRole(self::ROLE_JAKSA);
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

    public function getActiveCasesCountAttribute()
    {
        return $this->activeCases->count();
    }
}
