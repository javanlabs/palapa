<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

        if(\Illuminate\Support\Facades\App::environment() == 'production')
        {
            $this->command->error('You are in production mode, please add --class=LookupSeeder option');
            return false;
        }

        $this->call('RootSeeder');
        $this->call('StaffSeeder');
        $this->call('GroupSeeder');
        $this->call('RoleSeeder');
        $this->call('OfficerSeeder');
        $this->call('PenyidikSeeder');
        $this->call('PostSeeder');
        $this->call('SettingSeeder');

        $this->call('PangkatSeeder');
        $this->call('JabatanSeeder');
        $this->call('JenisKasusSeeder');
        $this->call('SopSeeder');
        $this->call('TemplateSeeder');

        Model::reguard();
	}

}

require __DIR__ . '/class/all.php';