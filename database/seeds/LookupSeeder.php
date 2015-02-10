<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class LookupSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call('PangkatSeeder');
        $this->call('JabatanSeeder');
        $this->call('JenisKasusSeeder');
        $this->call('SopSeeder');
        $this->call('TemplateSeeder');

        Model::reguard();
    }

}

require __DIR__ . '/class/all.php';