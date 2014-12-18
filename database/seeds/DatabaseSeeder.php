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

        Model::reguard();
	}

}

class PostSeeder extends Seeder{
    public function run(){

    }
}

class TemplateSeeder extends Seeder{
    public function run(){
        DB::table('templates')->truncate();
        $template = [
            [
            'checklist_id' => 1,
            'title' => 'P16 - Surat Perintah Penunjukan Penuntut Umum',
            'content' => file_get_contents(dirname(__FILE__) . '/templates/p16.php')
            ],
            [
            'checklist_id' => 1,
            'title' => 'Surat Perintah Penunjukan Petugas Administrasi',
            'content' => file_get_contents(dirname(__FILE__) . '/templates/p16a.php')            
            ],
            [
            'checklist_id' => 1,
            'title' => 'P19',
            'content' => '<p><strong>KEJAKSAAN NEGERI JEMBER</strong><b><br> <strong> "UNTUK KEADILAN"</strong></b></p> <table> <tbody><tr> <td> <table> <tbody><tr> <td> <p>Nomor</p> </td> <td> <p>:</p> </td> <td>  </td> </tr> <tr> <td> <p>Sifat</p> </td> <td> <p>:</p> </td> <td> <p>Biasa</p> </td> </tr> <tr> <td> <p>Lampiran</p> </td> <td> <p>:</p> </td> <td> <p>-</p> </td> </tr> <tr> <td> <p>Perihal</p> </td> <td> <p>:</p> </td> <td> <p>Pengembalian perkara pidana atas nama {case.tersangka} melanggar {case.pasal}, untuk dilengkapi</p> </td> </tr> </tbody></table>  </td> <td> <p>Jember, </p><p>KEPADA YTH.</p><p>KEPALA KEPOLISIAN </p><p>DI </p> </td> </tr> </tbody></table> <p>Sehubungan dengan surat kami nomor B- /0.5.12/…1/…/201… tanggal ……. 201… sesuai dengan pasal 110 ayat (2), (3) dan 138 ayat (2) KUHAP, bersama ini kami kembalikan Berkas Perkara Pidana atas nama tersangka {case.tersangka}, Berkas Perkara Nomor: {case.spdp_number} tanggal {case.start_date} yang kami terima tanggal {case.created_at} untuk saudara lengkapi dalam waktu 14 hari seterimanya berkas perkara ini, dengan petunjuk-petunjuk sebagai berikut:</p><p>Demikian untuk dilaksanakan</p> <table> <tbody><tr> <td>  </td> <td> <p>Dikeluarkan di : Jember</p><p>Pada tanggal : {now()}</p><p>KEPALA KEJAKSAAN NEGERI JEMBER</p> </td> </tr> <tr> <td> <p>Tembusan:</p> <ul><li>1.Yth. Kepala KejaksaanTinggi Jawa Timur</li> <li>2.Yth. Kepala Kepolisian ….</li> <li>3.Arsip.</li></ul> </td> <td>  </td> </tr></tbody></table>'
            ],
            [
            'checklist_id' => 1,
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
                ['id' => 1, 'name' => 'SPDP', 'duration' => 2, 'ordinal' => 1, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 2, 'name' => 'Tahap 1', 'duration' => 7, 'ordinal' => 2, 'icon' => '<strong>1</strong>'],
                ['id' => 3, 'name' => 'Tahap 2', 'duration' => 7, 'ordinal' => 3, 'icon' => '<strong>2</strong>'],
                ['id' => 4, 'name' => 'Penuntutan', 'duration' => 30, 'ordinal' => 4, 'icon' => '<i class="fa fa-legal"></i>'],
                ['id' => 5, 'name' => 'Persidangan', 'duration' => 60, 'ordinal' => 5, 'icon' => '<i class="fa fa-institution"></i>'],
            ]
        );

        DB::table('sop_checklist')->insert(
            [
                ['phase_id' => 1, 'name' => 'Menggandakan SPDP', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' => 1, 'name' => 'Labelisasi dan mencatat ke buku registrasi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' => 1, 'name' => 'Data entry ke DISKRIMTI', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' => 1, 'name' => 'P16 - Surat Perintah Penunjukan Penuntut Umum', 'duration' => 1, 'direction' => 'next', 'ordinal' => 4],

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
            ]
        );
        return true;
    }
}
