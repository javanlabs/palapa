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

		 $this->call('PangkatSeeder');
		 $this->call('JabatanSeeder');

        Model::reguard();
	}

}

class PangkatSeeder extends Seeder {

    public function run()
    {
        $now = Carbon::now()->toDateTimeString();
        $type = 'pangkat';

        DB::table('lookups')->whereType($type)->delete();
        $pangkat = [
            ['name'  => 'Ajun Jaksa Madya', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['name'  => 'Ajun Jaksa', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['name'  => 'Jaksa Pratama', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['name'  => 'Jaksa Muda', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['name'  => 'Jaksa Madya', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['name'  => 'Jaksa Utama Pratama', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['name'  => 'Jaksa Utama Madya', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['name'  => 'Jaksa Utama', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['name'  => 'Jaksa Agung', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
        ];
        return DB::table('lookups')->insert($pangkat);
    }
}

class JabatanSeeder extends Seeder {

    public function run()
    {
        $now = Carbon::now()->toDateTimeString();
        $type = 'jabatan';

        DB::table('lookups')->whereType($type)->delete();
        $pangkat = [
            ['name'  => 'Jaksa Penuntut Umum', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['name'  => 'Jaksa Penuntut Khusus', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
        ];
        return DB::table('lookups')->insert($pangkat);
    }
}
