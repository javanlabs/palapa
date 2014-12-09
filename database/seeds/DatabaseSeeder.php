<?php

use Carbon\Carbon;
use Faker\Factory;
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

		 $this->call('RootSeeder');
		 $this->call('StaffSeeder');
		 $this->call('GroupSeeder');
		 $this->call('RoleSeeder');
		 $this->call('PangkatSeeder');
		 $this->call('JabatanSeeder');
		 $this->call('OfficerSeeder');
		 $this->call('SopSeeder');

        Model::reguard();
	}

}

class RootSeeder extends Seeder {

    public function run()
    {
        $user = [
            'name'  => 'Root',
            'email'  => 'root@palapa.dev',
            'password'  => Hash::make('root')
        ];
        DB::table('users')->truncate();
        return DB::table('users')->insert($user);
    }

}

class StaffSeeder extends Seeder {

    public function run()
    {
        $user = [
            'name'  => 'Staff',
            'email'  => 'staff@palapa.dev',
            'password'  => Hash::make('staff')
        ];
        return DB::table('users')->insert($user);
    }

}

class GroupSeeder extends Seeder {

    public function run()
    {
        $groups = [
            ['name' => 'root', 'description' => 'Super user'],
            ['name' => 'staff', 'description' => 'Staff Administrasi'],
            ['name' => 'jaksa', 'description' => 'Jaksa'],
        ];
        DB::table('acl_groups')->truncate();
        return DB::table('acl_groups')->insert($groups);
    }

}

class RoleSeeder extends Seeder {

    public function run()
    {
        $roles = [
            ['user_id'  => 1, 'group_id'  => 1],
            ['user_id'  => 2, 'group_id'  => 2],
        ];
        DB::table('acl_users_groups')->truncate();
        return DB::table('acl_users_groups')->insert($roles);
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

class OfficerSeeder extends Seeder {

    public function run()
    {
        $now = Carbon::now()->toDateTimeString();
        $faker = Factory::create();

        DB::table('officers')->truncate();

        $officers = [];
        for($i=0;$i<20;$i++)
        {
            $officers[] = [
                'name'       => $faker->name,
                'nip'        => $faker->randomNumber(9),
                'pangkat_id' => rand(1, 9),
                'jabatan_id' => rand(10, 11),
                'created_at' => $now,
                'updated_at' => $now
            ];
        }

        return DB::table('officers')->insert($officers);
    }
}

class SopSeeder extends Seeder {

    public function run()
    {
        DB::table('sop_phase')->truncate();
        DB::table('sop_checklist')->truncate();

        DB::table('sop_phase')->insert(
            [
                ['id' => 1, 'name' => 'SPDP', 'ordinal' => 1],
                ['id' => 2, 'name' => 'Tahap 1', 'ordinal' => 2],
                ['id' => 3, 'name' => 'Tahap 2', 'ordinal' => 3],
                ['id' => 4, 'name' => 'Penuntutan', 'ordinal' => 4],
                ['id' => 5, 'name' => 'Persidangan', 'ordinal' => 5],
            ]
        );

        DB::table('sop_checklist')->insert(
            [
                ['phase_id' => 1, 'name' => 'Menggandakan SPDP', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' => 1, 'name' => 'Labelisasi dan mencatat ke buku registrasi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' => 1, 'name' => 'Data entry ke DISKRIMTI', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' => 1, 'name' => 'P16 - Surat Perintah Penunjukan Penuntut Umum', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 4],

                ['phase_id' => 2, 'name' => 'P18', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' => 2, 'name' => 'P19', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' => 2, 'name' => 'P21', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' => 2, 'name' => 'P21 A', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' => 2, 'name' => 'Kasus ditolak', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 5],

                ['phase_id' => 3, 'name' => 'BA pendapat penahanan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 1],

                ['phase_id' => 4, 'name' => 'Pelimpahan perkara ke pengadilan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' => 4, 'name' => 'Pembacaan surat dakwaan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' => 4, 'name' => 'Pembacaan surat dakwaan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' => 4, 'name' => 'Tanggapan terhadap eksepsi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 3],

                ['phase_id' => 5, 'name' => 'Banding', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' => 5, 'name' => 'Kasasi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' => 5, 'name' => 'Putusan Pengadilan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 3],
            ]
        );
        return true;
    }
}
