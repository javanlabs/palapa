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
		 $this->call('JenisKasusSeeder');
		 $this->call('OfficerSeeder');
		 $this->call('SopSeeder');
         $this->call('TemplateSeeder');
        $this->call('PenyidikSeeder');
        Model::reguard();
	}

}

class PostSeeder extends Seeder{
    public function run(){

    }
}

class PenyidikSeeder extends Seeder{
    public function run(){
        $now = Carbon::now()->toDateTimeString();
        $type = 'penyidik';

        DB::table('lookups')->whereType($type)->delete();
        $penyidik= [
            ['id' => 301, 'name'  => 'Mabes Polri', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 302, 'name'  => 'Polda Jatim', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 303, 'name'  => 'Polres Jember', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 304, 'name'  => 'Polsek Arjasa', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 305, 'name'  => 'Polsek Pakusari', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 306, 'name'  => 'Polsek Kalisat', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 307, 'name'  => 'Polsek Sukowono', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 308, 'name'  => 'Polsek Ledokombo', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 309, 'name'  => 'Polsek Sumberjambe', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 310, 'name'  => 'Polsek Mayang', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 311, 'name'  => 'Polsek Mumbulsari', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 312, 'name'  => 'Polsek Tempurejo', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 313, 'name'  => 'Polsek Sempolan', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 314, 'name'  => 'Polsek Rambipuji', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 315, 'name'  => 'Polsek Panti', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 316, 'name'  => 'Polsek Kaliwates', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 317, 'name'  => 'Polsek Jenggawah', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 318, 'name'  => 'Polsek Balung', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 319, 'name'  => 'Polsek Ambulu', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 320, 'name'  => 'Polsek Wuluhan', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 321, 'name'  => 'Polsek Tanggul', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 322, 'name'  => 'Polsek Bangsalsari', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 323, 'name'  => 'Polsek Sumberbaru', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 324, 'name'  => 'Polsek Kencong', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 325, 'name'  => 'Polsek Gumukmas', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 326, 'name'  => 'Polsek Umbulsari', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 327, 'name'  => 'Polsek Puger', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 328, 'name'  => 'Polsek Sumbersari', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 329, 'name'  => 'Polsek Patrang', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 330, 'name'  => 'Polsek Sukorambi', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],            
            ['id' => 331, 'name'  => 'Polsek Semboro', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 332, 'name'  => 'Polsek Jelbuk', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 333, 'name'  => 'Polsek Jombang', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
        ];        
        return DB::table('lookups')->insert($penyidik);
    }
}

class TemplateSeeder extends Seeder{
    public function run(){
        DB::table('templates')->truncate();
        $template = [
            [
            'checklist_id' => 1,
            'phase_id' => 1,
            'title' => 'P16 - Surat Perintah Penunjukan Penuntut Umum',
            'content' => file_get_contents(dirname(__FILE__) . '/templates/p16.php')
            ],
            [
            'checklist_id' => 1,
            'phase_id' => 1,
            'title' => 'Surat Perintah Penunjukan Petugas Administrasi',
            'content' => file_get_contents(dirname(__FILE__) . '/templates/p16a.php')
            ],
            [
            'checklist_id' => 1,
            'phase_id' => 1,
            'title' => 'P19',
            'content' => file_get_contents(dirname(__FILE__) . '/templates/p19.php')
            ],
            [
            'checklist_id' => 1,
            'phase_id' => 1,
            'title' => 'P21',
            'content' => '<p><strong>KEJAKSAAN NEGERI JEMBER</strong><b><br> <strong> "UNTUK KEADILAN"</strong></b></p> <table> <tbody><tr> <td> <table> <tbody><tr> <td> <p>Nomor</p> </td> <td> <p>:</p> </td> <td>  </td> </tr> <tr> <td> <p>Sifat</p> </td> <td> <p>:</p> </td> <td> <p>Biasa</p> </td> </tr> <tr> <td> <p>Lampiran</p> </td> <td> <p>:</p> </td> <td> <p>-</p> </td> </tr> <tr> <td> <p>Perihal</p> </td> <td> <p>:</p> </td> <td> <p>Pemberitahuan hasil penyidikan perkara pidana atas nama Tersangka {case.suspect_name} melanggar {case.pasal} sudah lengkap</p> </td> </tr> </tbody></table>  </td> <td> <p>Jember, </p><p>KEPADA YTH.</p><p>KEPALA KEPOLISIAN </p><p>DI </p> </td> </tr> </tbody></table> <p>Sehubungan dengan penyerahan berkas perkara pidana atas nama Tersangka {case.suspect_name} Nomor: {case.spdp_number} Tanggal {case.start_date} yang kami terima tanggal {case.created_at} setelah dilakukan penelitian ternyata hasil penyidikannya sudah lengkap.</p><p>Sesuai dengan ketentuan pasal 8 ayat (3) huruf b, pasal 138 ayat (1) dan pasal 139 KUHAP supaya Saudara menyerahkan tanggung jawab tersangka dan barang bukti kepada kami, guna menentukan apakah perkara tersebut sudah menenuhi persyaratan untuk dapat atau tidak dilimpahkan ke Pengadilan.</p><p>Demikian untuk dimaklumi</p> <table> <tbody><tr> <td>  </td> <td> <p>Dikeluarkan di : Jember</p><p>Pada tanggal : {now()}</p><p>KEPALA KEJAKSAAN NEGERI JEMBER</p> </td> </tr> <tr> <td> <p>Tembusan:</p> <ul><li>1.Yth. Kepala KejaksaanTinggi Jawa Timur</li> <li>2.Yth. Kepala Kepolisian ….</li> <li>3.Arsip.</li></ul> </td> <td>  </td> </tr></tbody></table>'
            ],
        ];

        return DB::table('templates')->insert($template);
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
            'name'  => 'Staff Administrasi',
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
            ['id' => 1, 'name'  => 'Ajun Jaksa Madya', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name'  => 'Ajun Jaksa', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name'  => 'Jaksa Pratama', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name'  => 'Jaksa Muda', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name'  => 'Jaksa Madya', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'name'  => 'Jaksa Utama Pratama', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7, 'name'  => 'Jaksa Utama Madya', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8, 'name'  => 'Jaksa Utama', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'name'  => 'Jaksa Agung', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
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
            ['id' => 101, 'name'  => 'Jaksa Penuntut Umum', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 102, 'name'  => 'Jaksa Penuntut Khusus', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
        ];
        return DB::table('lookups')->insert($pangkat);
    }
}

class JenisKasusSeeder extends Seeder {

    public function run()
    {
        $now = Carbon::now()->toDateTimeString();
        $type = 'kasus';

        DB::table('lookups')->whereType($type)->delete();
        $pangkat = [
            ['id' => 201, 'name'  => 'Pidana Umum', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],

            ['id' => 211, 'name'  => 'Perdata - BANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 212, 'name'  => 'Perdata - THL', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 213, 'name'  => 'Perdata - TIMKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 214, 'name'  => 'Perdata - YANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],

            ['id' => 221, 'name'  => 'PPH - BANKUM LITIGASI', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 222, 'name'  => 'PPH - BANKUM NON LITIGASI', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 223, 'name'  => 'PPH - THL', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 224, 'name'  => 'PPH - TIMKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 225, 'name'  => 'PPH - YANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],

            ['id' => 231, 'name'  => 'TUN - BANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 232, 'name'  => 'TUN - THL', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 233, 'name'  => 'TUN - TIMKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 234, 'name'  => 'TUN - YANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
        ];
        return DB::table('lookups')->insert($pangkat);
    }
}

class OfficerSeeder extends Seeder {

    public function run()
    {
        $now = Carbon::now()->toDateTimeString();

        DB::table('officers')->truncate();

        $officers = [
            [
                'name'       => "Eko Wahyudi, S.H., M.H.",
                'nip'        => "19800506 200501 1 006",
                'pangkat_id' => "3",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name'       => "Reza Prasetya Nitisasmita, S.H.",
                'nip'        => "197807726 200212 1 004",
                'pangkat_id' => "1",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name'       => "Endah Puspitorini, SH.",
                'nip'        => "19820419 20050 1 2010",
                'pangkat_id' => "3",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name'       => "Adik Sri Sumarsih, S.H., M.M.",
                'nip'        => "19710916 199803 2 002",
                'pangkat_id' => "4",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name'       => "Anak Agung Gede Hendrawan, S.H.",
                'nip'        => "19811023 200603 1 002",
                'pangkat_id' => "3",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name'       => "Lusiana, S.H.",
                'nip'        => "19730725 200003 2 002",
                'pangkat_id' => "4",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name'       => "I Made Adi Sudiantara, S.H.",
                'nip'        => "19691110 199803 1 001",
                'pangkat_id' => "4",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name'       => "Danni Arthana, S.H.",
                'nip'        => "19801209 200702 1 001",
                'pangkat_id' => "2",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name'       => "Eko Tjahjono, S.H., M.H.",
                'nip'        => "19671229 198803 1 002",
                'pangkat_id' => "5",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'name'       => "Tendik Wicaksono, S.H., M.H.",
                'nip'        => "19781024 200501 1 004",
                'pangkat_id' => "3",
                'jabatan_id' => "101",
                'created_at' => $now,
                'updated_at' => $now
            ],

        ];

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
                ['id' => 1, 'case_type_id' => 201, 'name' => 'SPDP', 'duration' => 2, 'ordinal' => 1, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 2, 'case_type_id' => 201, 'name' => 'Tahap 1', 'duration' => 7, 'ordinal' => 2, 'icon' => '<strong>1</strong>'],
                ['id' => 3, 'case_type_id' => 201, 'name' => 'Tahap 2', 'duration' => 7, 'ordinal' => 3, 'icon' => '<strong>2</strong>'],
                ['id' => 4, 'case_type_id' => 201, 'name' => 'Penuntutan', 'duration' => 30, 'ordinal' => 4, 'icon' => '<i class="fa fa-legal"></i>'],
                ['id' => 5, 'case_type_id' => 201, 'name' => 'Persidangan', 'duration' => 60, 'ordinal' => 5, 'icon' => '<i class="fa fa-institution"></i>'],

                /* Datun Bankum*/
                ['id' => 6, 'case_type_id' => 211, 'name' => 'Persiapan', 'duration' => 30, 'ordinal' => 1, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 7, 'case_type_id' => 211, 'name' => 'Pelaksanaan', 'duration' => 448, 'ordinal' => 2, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 8, 'case_type_id' => 211, 'name' => 'Pelaporan', 'duration' => 60, 'ordinal' => 3, 'icon' => '<i class="fa fa-institution"></i>'],
                
                
                /* Datun THL*/
                ['id' => 9, 'case_type_id' => 212, 'name' => 'Persiapan', 'duration' => 54, 'ordinal' => 1, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 10, 'case_type_id' => 212, 'name' => 'Pelaksanaan', 'duration' => 118, 'ordinal' => 2, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 11, 'case_type_id' => 212, 'name' => 'Pelaporan', 'duration' => 180, 'ordinal' => 3, 'icon' => '<i class="fa fa-institution"></i>'],

                /* Datun Tinkum*/
                ['id' => 12, 'case_type_id' => 213, 'name' => 'Persiapan', 'duration' => 44, 'ordinal' => 1, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 13, 'case_type_id' => 213, 'name' => 'Pelaksanaan', 'duration' => 35, 'ordinal' => 2, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 14, 'case_type_id' => 213, 'name' => 'Pelaporan', 'duration' => 120, 'ordinal' => 3, 'icon' => '<i class="fa fa-institution"></i>'],

                /* Datun Yankum*/
                ['id' => 15, 'case_type_id' => 214, 'name' => 'Persiapan', 'duration' => 35, 'ordinal' => 1, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 16, 'case_type_id' => 214, 'name' => 'Pelaksanaan', 'duration' => 51, 'ordinal' => 2, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 17, 'case_type_id' => 214, 'name' => 'Pelaporan', 'duration' => 20, 'ordinal' => 3, 'icon' => '<i class="fa fa-institution"></i>'],
            ]
        );

        DB::table('sop_checklist')->insert(
            [
                ['phase_id' => 1, 'name' => 'Penerimaan SPDP', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' => 1, 'name' => 'P-16 - Surat Perintah Penunjukan Penuntut Umum', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' => 1, 'name' => 'Penerimaan Berkas Tahap 1', 'duration' => 1, 'direction' => 'next', 'ordinal' => 3],
                ['phase_id' => 1, 'name' => 'P-17', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' => 1, 'name' => 'SPDP Dikembalikan', 'duration' => 1, 'direction' => 'stop', 'ordinal' => 5],

                ['phase_id' => 2, 'name' => 'P18', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' => 2, 'name' => 'P19', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' => 2, 'name' => 'P21', 'duration' => 1, 'direction' => 'next', 'ordinal' => 3],
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

                ['phase_id' =>6, 'name' => 'Menerima dan meregister permohonan Bantuan Hukum', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>6, 'name' => 'Meneruskan permohonan Bantuan Hukum kepada JAM DATUN/Kajati/Kajari', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' =>6, 'name' => 'Meneruskan permohonan Bantuan Hukum dan pemberian arahan kepada Direktur Perdata/Asisten DATUN/Kasi DATUN', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' =>6, 'name' => 'Meneruskan permohonan Bantuan Hukum dan pemberian arahan kepada Kepala Sub Direktorat Bantuan Hukum Perdata /Kasi Perdata di Kejati/Kasi DATUN di Kejari', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' =>6, 'name' => 'Membuat net konsep surat perintah telaah kepada Unit Pelaksana', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 5],
                ['phase_id' =>6, 'name' => 'Menandatangani Surat Perintah telaah Permohonan Bantuan Hukum', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' =>6, 'name' => 'Mengundang pihak Pemohon Permintaan Bantuan Hukum atau calon Pemberi Kuasa untuk memaparkan perkara/kasus dan memberikan data-data kepada Tim JPN (Unit Pelaksana) yang ditunjuk berdasarkan Surat Perintah untuk menelaah', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 7],
                ['phase_id' =>6, 'name' => 'Membuat dan menyampaikan telaahan atas Permohonan Bantuan Hukum kepada JAM DATUN/Kajati/Kajari', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 8],

                ['phase_id' =>7, 'name' => 'Menerima Surat Kuasa Khusus dari Pihak Tergugat', 'duration' =>7, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>7, 'name' => 'Persidangan', 'duration' =>365, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' =>7, 'name' => 'Pelaporan hasil persidangan ', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' =>7, 'name' => 'Upaya hukum tingkat banding, mengajukan permohonan banding ke Pengadilan Tinggi', 'duration' =>7, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' =>7, 'name' => 'Pelaporan pengajuan banding kepada Pimpinan ', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 5],
                ['phase_id' =>7, 'name' => 'Menyusun memori banding dan penyerahan memori banding ke Pengadilan ', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' =>7, 'name' => 'Pelaporan pengajuan memori banding kepada pimpinan', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 7],
                ['phase_id' =>7, 'name' => 'Upaya hukum tingkat kasasi, mengajukan permohonan kasasi ke Mahkamah Agung', 'duration' =>7, 'direction' => 'stay', 'ordinal' => 8],
                ['phase_id' =>7, 'name' => 'Menyusun memori kasasi dan penyerahan memori kasasi ke Pengadilan ', 'duration' =>7, 'direction' => 'stay', 'ordinal' => 9],
                ['phase_id' =>7, 'name' => 'Pelaporan pengajuan memori kasasi kepada pimpinan', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 10],
                ['phase_id' =>7, 'name' => 'Upaya hukum Peninjauan Kembali, penyusunan memori Peninjauan Kembali, dan pengajuan memori Peninjauan Kembali', 'duration' =>30, 'direction' => 'stay', 'ordinal' => 11],
                ['phase_id' =>7, 'name' => 'Pelaporan pengajuan PK  kepada pimpinan', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 12],

                ['phase_id' =>8, 'name' => 'Laporan akhir penyelesaian perkara ', 'duration' =>0, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>8, 'name' => 'Pemberkasan perkara/penjilidan', 'duration' =>0, 'direction' => 'stay', 'ordinal' => 2],

                ['phase_id' =>9, 'name' => 'Menerima dan meregister permohonan Tindakan Hukum Lain ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>9, 'name' => 'Meneruskan permohonan Tindakan Hukum Lain kepada JAM Datun', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' =>9, 'name' => 'Meneruskan permohonan Tindakan Hukum Lain dan pemberian arahan kepada Direktur Perdata', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' =>9, 'name' => 'Meneruskan permohonan Tindakan Hukum Lain dan pemberian arahan kepada Kepala Sub Direktorat Yankum Perdata', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' =>9, 'name' => 'Membuat net konsep surat perintah telaah kepada UP', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 5],
                ['phase_id' =>9, 'name' => 'Menandatangani Surat Perintah Telaah Permohonan Tindakan Hukum Lain', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' =>9, 'name' => 'UP membuat undangan yang ditujukan kepada Pemohon Tindakan Hukum Lain untuk memaparkan/ekspose kasus serta memberikan data-data penunjang/ dokumen-dokumen terkait ', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 7],
                ['phase_id' =>9, 'name' => 'UP menyampaikan telaahan atas Permohonan Tindakan Hukum Lain kepada Direktur Perdata, disertai Net Konsep Nodis dari Direktur Perdata kpd JAM Datun dan Net Konsep Nodis dari JAM Datun kpd JA', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 8],
                ['phase_id' =>9, 'name' => 'Direktur Perdata melaporkan telaahan kepada JAM Datun', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 9],
                ['phase_id' =>9, 'name' => 'Melaporkan telaahan kepada Jaksa Agung RI', 'duration' =>0, 'direction' => 'stay', 'ordinal' => 10],
                ['phase_id' =>9, 'name' => 'UP melaksanakan disposisi Jaksa Agung RI', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 11],
                ['phase_id' =>9, 'name' => 'UP membuat net konsep surat kepada pihak lainnya untuk menanyakan apakah setuju menggunakan Jaksa Pengacara negara sebagai mediator', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 12],
                ['phase_id' =>9, 'name' => 'Menandatangani Surat Persetujuan kepada Pihak lain tentang penunjukan JPN sebagai Mediator ', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 13],
                ['phase_id' =>9, 'name' => 'Menyampaikan surat persetujuan penunjukan JPN sebagai Mediator kepada Pihak lain dan kemudian menunggu jawaban dari pihak lain', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 14],
                ['phase_id' =>9, 'name' => 'Melaporkan jawaban dari pihak lain ', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 15],
                ['phase_id' =>9, 'name' => 'Membuat net konsep surat perintah sebagai mediator ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 16],
                ['phase_id' =>9, 'name' => 'Menandatangani Surat Perintah', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 17],
                ['phase_id' =>9, 'name' => 'Membuat net konsep Surat Pemberitahuan kepada Pemohon ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 18],
                ['phase_id' =>9, 'name' => 'Menandatangani Surat Pemberitahuan kepada Pemohon THL', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 19],


                ['phase_id' =>10, 'name' => 'UP membuat undangan yang ditujukan kepada Para Pihak', 'duration' =>7, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>10, 'name' => 'UP melakukan Pertemuan dengan para pihak untuk mengetahui keinginan masing-masing pihak', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' =>10, 'name' => 'UP menyampaikan nodis serta net konsep alternatif penyelesaian kasus', 'duration' =>5, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' =>10, 'name' => 'Direktur Perdata melaporkan draft alternatif penyelesaian sengketa kepada JAM Datun', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' =>10, 'name' => 'Setelah menerima disposisi dari JAMDATUN, UP segera menyerahkan alternatif penyelesaian sengketa kepada para pihak ', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 5],
                ['phase_id' =>10, 'name' => 'Setelah mendapatkan jawaban/persetujuan dari para pihak , UP segera membuat Berita Acara Kesepakatan dan menyampaikannya kembali kepada para pihak untuk diteliti.  ', 'duration' =>14, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' =>10, 'name' => 'Direktur Perdata melaporkan kepada Jamdatun ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 7],
                ['phase_id' =>10, 'name' => 'Setelah UP menerima disposisi Jamdatun, UP segera menyerahkan Berita Acara Kesepakatan kepada para pihak ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 8],
                ['phase_id' =>10, 'name' => 'UP menerima  pesetujuan dari Berita Acara Kesepakatan, UP melaporkan kepada Direktur Perdata ', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 9],
                ['phase_id' =>10, 'name' => 'Direktur Perdata melaporkan kepada jamdatun', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 10],
                ['phase_id' =>10, 'name' => 'UP menerima Disposisi Jamdatun dan segera membuat draft Akta perdamaian', 'duration' =>0, 'direction' => 'stay', 'ordinal' => 11],
                ['phase_id' =>10, 'name' => 'Direktur Perdata melaporkan draft akta perdamaian kepada Jamdatun ', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 12],
                ['phase_id' =>10, 'name' => 'UP menerima Disposisi Jamdatun dan segera menyampaikan kepada para pihak', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 13],
                ['phase_id' =>10, 'name' => ' Para pihak meneliti kembali draft akta perdamaian', 'duration' =>14, 'direction' => 'stay', 'ordinal' => 14],
                ['phase_id' =>10, 'name' => 'Akta perdamaian disetujui para pihak, UP menyiapka penandatanganan', 'duration' =>60, 'direction' => 'stay', 'ordinal' => 15],


                ['phase_id' =>11, 'name' => 'Laporan akhir penyelesaian perkara ', 'duration' =>180, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>11, 'name' => 'Pemberkasan perkara/penjilidan', 'duration' =>60, 'direction' => 'stay', 'ordinal' => 2],

                ['phase_id' =>12, 'name' => 'Menerima dan meregister permohonan Pertimbangan  Hukum', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>12, 'name' => 'Meneruskan permohonan Pertimbangan Hukum kepada JAM DATUN', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' =>12, 'name' => 'Meneruskan permohonan Pertimbangan Hukum dan pemberian arahan kepada Direktur Perdata', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' =>12, 'name' => 'Meneruskan permohonan Pertimbangan Hukum dan pemberian arahan kepada Kepala Sub Direktorat Pelayanan Hukum', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' =>12, 'name' => 'Membuat net konsep surat perintah telaah kepada Unit Pelaksana', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 5],
                ['phase_id' =>12, 'name' => 'Menandatangani Surat Perintah telaah Permohonan Pertimbangan Hukum', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' =>12, 'name' => 'Mengundang pihak Pemohon Permintaan Pertimbangan Hukum untuk memaparkan permasalan yang dimohonkan pendapat hukum dan memberikan data-data kepada Tim JPN (Unit Pelaksana) yang ditunjuk berdasarkan Surat Perintah untuk menelaah', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 7],
                ['phase_id' =>12, 'name' => 'Membuat dan menyampaikan telaahan atas Permohonan Pertimbangan Hukum kepada JAM DATUN', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 8],
                ['phase_id' =>12, 'name' => 'Melaporkan telaahan kepada Jaksa Agung RI dengan Surat yang ditandatangani oleh JAM DATUN', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 9],
                ['phase_id' =>12, 'name' => 'Memerintahkan Unit Pelaksana untuk melakukan pemaparan/ ekspose terhadap telaahan ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 10],
                ['phase_id' =>12, 'name' => 'Melaksanakan ekspose telaahan ', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 11],
                ['phase_id' =>12, 'name' => 'Memberi petunjuk terhadap hasil telaah', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 12],
                ['phase_id' =>12, 'name' => 'Memberikan petunjuk untuk menyiapkan net konsep Surat Perintah Pemberian Pertimbangan Hukum', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 13],
                ['phase_id' =>12, 'name' => 'Membuat net konsep Surat Perintah oleh Tim JPN', 'duration' =>0, 'direction' => 'stay', 'ordinal' => 14],
                ['phase_id' =>12, 'name' => 'Memeriksa net konsep Surat Perintah Pemberian Pertimbangan Hukum', 'duration' =>0, 'direction' => 'stay', 'ordinal' => 15],
                ['phase_id' =>12, 'name' => 'Menandatangani Surat Perintah Pemberian Pertimbangan Hukum', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 17],
                ['phase_id' =>12, 'name' => 'Surat Perintah Pemberian Pendapat Hukum diberikan kepada Tim JPN', 'duration' =>0, 'direction' => 'stay', 'ordinal' => 18],

                ['phase_id' =>13, 'name' => 'Mengundang pihak Pemohon Pendapat Hukum (LO)/ Pendampingan Hukum (LA) kepada Tim JPN (Unit Pelaksana) yang ditunjuk.', 'duration' =>7, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>13, 'name' => 'Pelaksanaan pemaparan oleh Pemohon LO/LA', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' =>13, 'name' => 'UP membuat laporan ekspose/pemaparan ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' =>13, 'name' => 'Disposisi JAM DATUN atas ND Laporan ekspose/ pemaparan', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' =>13, 'name' => 'UP membuat draft Pendapat Hukum / membuat telaahan Pendampingan Hukum ', 'duration' =>7, 'direction' => 'stay', 'ordinal' => 5],
                ['phase_id' =>13, 'name' => 'UP melaporkan draft Pendapat LO/ Telaahan LA kepada Direktur Perdata diteruskan kepada Jamdatun', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' =>13, 'name' => 'Disposisi Jamdatun ', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 7],
                ['phase_id' =>13, 'name' => 'UP membuat LO yang akan diserahkan kepada Pemohon LO & UP melaksanakan Pendampingan Hukum', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 8],
                ['phase_id' =>13, 'name' => 'Menandatangani Pendapat Hukum untuk Pemohon ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 9],
                ['phase_id' =>13, 'name' => 'Menyampaikan Pendapa Hukum (LO) kepada Pemohon LO', 'duration' =>7, 'direction' => 'stay', 'ordinal' => 10],


                ['phase_id' =>14, 'name' => 'Laporan akhir telah diberikannya Pendapat Hukum (LO) / Pendampingan Hukum (LA)', 'duration' =>60, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>14, 'name' => 'Pemberkasan perkara/penjilidan', 'duration' =>60, 'direction' => 'stay', 'ordinal' => 2],


                ['phase_id' =>15, 'name' => 'Menerima dan meregister permohonan Pelayanan Hukum. ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>15, 'name' => 'Meneruskan permohonan Pelayanan Hukum kepada JAM DATUN', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' =>15, 'name' => 'Meneruskan permohonan Pelayanan Hukum dan pemberian arahan kepada Direktur Perdata ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' =>15, 'name' => 'Meneruskan permohonan Pelayanan Hukum dan pemberian arahan kepada Kasubdit Yankum Perdata ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' =>15, 'name' => 'Membuat net konsep surat perintah telaah kepada Unit Pelaksana', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 5],
                ['phase_id' =>15, 'name' => 'Menandatangani Surat Perintah telaah Permohonan Pelayanan Hukum', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' =>15, 'name' => 'Mengundang pihak Pemohon Permintaan Pelayanan Hukum jika diperlukan guna melengkapi data-data yang diperlukan Tim JPN (Unit Pelaksana) yang ditunjuk berdasarkan Surat Perintah untuk menelaah.', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 7],
                ['phase_id' =>15, 'name' => 'Membuat dan menyampaikan telaahan atas Permohonan Pelayanan  Hukum kepada JAM DATUN', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 8],
                ['phase_id' =>15, 'name' => 'Melaporkan telaahan kepada Jaksa Agung RI dengan Surat yang ditandatangani oleh JAM DATUN', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 9],
                ['phase_id' =>15, 'name' => 'Memerintahkan Unit Pelaksana untuk melakukan pemaparan/ ekspose terhadap telaahan ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 10],


                ['phase_id' =>16, 'name' => 'Unit Pelaksana membuat draft telaahan sebagai penjelasan atas permasalahan hukum yang disampaikan  Pemohon', 'duration' =>7, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>16, 'name' => 'Meneruskan permohonan Pelayanan Hukum kepada JAM DATUN', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' =>16, 'name' => 'Meneruskan permohonan Pelayanan Hukum dan pemberian arahan kepada Direktur Perdata ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' =>16, 'name' => 'Meneruskan permohonan Pelayanan Hukum dan pemberian arahan kepada Kasubdit Yankum Perdata ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' =>16, 'name' => 'Membuat net konsep surat perintah telaah kepada Unit Pelaksana', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 5],
                ['phase_id' =>16, 'name' => 'Menandatangani Surat Perintah telaah Permohonan Pelayanan Hukum', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' =>16, 'name' => 'Mengundang pihak Pemohon Permintaan Pelayanan Hukum jika diperlukan guna melengkapi data-data yang diperlukan Tim JPN (Unit Pelaksana) yang ditunjuk berdasarkan Surat Perintah untuk menelaah.', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 7],
                ['phase_id' =>16, 'name' => 'Membuat dan menyampaikan telaahan atas Permohonan Pelayanan  Hukum kepada JAM DATUN', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 8],
                ['phase_id' =>16, 'name' => 'Melaporkan telaahan kepada Jaksa Agung RI dengan Surat yang ditandatangani oleh JAM DATUN', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 9],
                ['phase_id' =>16, 'name' => 'Memerintahkan Unit Pelaksana untuk melakukan pemaparan/ ekspose terhadap telaahan ', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 10],
                ['phase_id' =>16, 'name' => 'Melaksanakan ekspose telaahan ', 'duration' =>3, 'direction' => 'stay', 'ordinal' => 11],
                ['phase_id' =>16, 'name' => 'Memberi petunjuk terhadap hasil telaah', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 12],
                ['phase_id' =>16, 'name' => 'Memberikan petunjuk untuk menyiapkan net konsep Surat Kuasa', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 13],
                ['phase_id' =>16, 'name' => 'Membuat net konsep Surat Kuasa Substitusi oleh Staf TU Bankum Dit. PPH', 'duration' =>0, 'direction' => 'stay', 'ordinal' => 14],
                ['phase_id' =>16, 'name' => 'Memeriksa net konsep Surat Kuasa substitusi', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 15],
                ['phase_id' =>16, 'name' => 'Menandatangani Surat Kuasa Substitusi', 'duration' =>1, 'direction' => 'stay', 'ordinal' => 16],
                ['phase_id' =>16, 'name' => 'Penandatanganan Surat Kuasa Substitusi oleh JPN pada Unit Pelaksana yang ditunjuk', 'duration' =>2, 'direction' => 'stay', 'ordinal' => 17],


                ['phase_id' =>17, 'name' => 'Laporan akhir Pemberian Pelayanan Hukum Masyarakat', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' =>17, 'name' => 'Pemberkasan /penjilidan', 'duration' =>10, 'direction' => 'stay', 'ordinal' => 2],

            ]
        );
        return true;
    }
}
