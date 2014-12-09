<?php namespace App\Cases;

trait Presenter {

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
        $faker = \Faker\Factory::create();
        return $faker->randomElement(['success', 'success', 'success', 'warning', 'danger']);
    }

    public function getStatusIntelAttribute()
    {
        $faker = \Faker\Factory::create();
        return $faker->randomElement(['success', 'success', 'success', 'warning', 'danger']);
    }

    public function getStatusPenuntutanAttribute()
    {
        $faker = \Faker\Factory::create();
        return $faker->randomElement(['success', 'success', 'success', 'warning', 'danger']);
    }

}
