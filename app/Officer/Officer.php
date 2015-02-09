<?php namespace App\Officer;

use App\AuditTrail\Loggable;
use App\AuditTrail\RevisionableTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Officer extends Model implements Loggable{

    const ROLE_STAFF = 'staff';
    const ROLE_JAKSA = 'jaksa';

    use SoftDeletes, RevisionableTrait;

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

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function scopeStaff($query)
    {
        return $query->whereRole(self::ROLE_STAFF)->orderBy('name');
    }

    public function scopeJaksa($query)
    {
        return $query->whereRole(self::ROLE_JAKSA)->orderBy('name');
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

    public function getNameAttribute()
    {
        return $this->attributes['name'];
    }

    public function identifiableName()
    {
        return $this->name;
    }

}
