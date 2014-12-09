<?php namespace App\Cases;

use Carbon\Carbon;

trait Presenter {

    public function getPermalinkAttribute()
    {
        return route('backend.cases.show', [$this->id]);
    }

    public function getNameAttribute()
    {
        return $this->kasus;
    }

    public function getProsecutorNameAttribute()
    {
        return $this->jaksa->name;
    }

    public function getLastUpdateAttribute()
    {
        return $this->updated_at->format('j F Y');
    }

    public function getStatusSpdpAttribute()
    {
        return false;
    }

    public function getStatusTahap1Attribute()
    {
        //$faker = \Faker\Factory::create();
        //return $faker->randomElement(['success', 'success', 'success', 'warning', 'danger']);
    }

    public function getStatusTahap2Attribute()
    {
        $faker = \Faker\Factory::create();
        return $faker->randomElement(['success', 'success', 'success', 'warning', 'danger']);
    }

    public function getStatusPenuntutanAttribute()
    {
        $faker = \Faker\Factory::create();
        return $faker->randomElement(['success', 'success', 'success', 'warning', 'danger']);
    }

    public function getStatusPersidanganAttribute()
    {
        $faker = \Faker\Factory::create();
        return $faker->randomElement(['success', 'success', 'success', 'warning', 'danger']);
    }

    public function getStatusNameAttribute()
    {
        return $this->phase->name;
    }

    public function getAgeAttribute()
    {
        return $this->date->diffInDays(Carbon::now());
    }
}
