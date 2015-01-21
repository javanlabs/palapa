<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Faker\Factory;

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
        $this->call('PostSeeder');
        $this->call('SettingSeeder');

        Model::reguard();
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

            // PIDUM
            [
                'short_title' => 'P-16',
                'title' => 'Surat Perintah Penunjukan JPU untuk mengikuti Perkembangan Penyidikan perkara tindak pidana',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-17',
                'title' => 'Permintaan Perkembangan Hasil Penyidikan',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-18',
                'title' => 'Hasil Penyidikan Belum Lengkap',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-19',
                'title' => 'Pengembalian Berkas Perkara untuk dilengkapi',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-20',
                'title' => 'Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-21',
                'title' => 'Pemberitahuan Hasil Penyidikan Sudah Lengkap',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-21A',
                'title' => 'Pemberitahuan Susulan Hasil Penyidikan Sudah Lengkap',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-16A',
                'title' => 'Surat Perintah Penunjukan JPU untuk Penyelesaian Perkara Tindak Pidana',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-31',
                'title' => 'Surat Pelimpahan Perkara Acara Pemeriksaan Biasa (APB)',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-44',
                'title' => 'Laporan JPU Segera Setelah Putusan',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-45',
                'title' => 'Laporan Putusan Pengadilan',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-48',
                'title' => 'Surat Perintah Pelaksanaan Putusan Pengadilan',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'P-53',
                'title' => 'Kartu Perkara Tindak Pidana',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'BA-8',
                'title' => 'Berita Acara Pelaksanaan Putusan Pengadilan',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'BA-10',
                'title' => 'Berita Acara Perintah Pelaksanaan Perintah Penahanan - Penahanan Lanjutan',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'BA-15',
                'title' => 'Berita Acara Penerimaan dan Penelitian Tersangka',
                'case_type_id' => 201
            ],
            [
                'short_title' => 'BA-18',
                'title' => 'Berita Acara Penerimaan dan Penelitian Benda Sitaan - Barang Bukti',
                'case_type_id' => 201
            ],

            // PIDSUS

            // PENYELIDIKAN
            [
                'short_title'  => 'P-1',
                'title'        => 'Penerimaan Laporan',
                'case_type_id' => 202
            ],
            [
                'short_title'  => 'P-2',
                'title'        => 'Surat Perintah Penyelidikan',
                'case_type_id' => 202
            ],
            [
                'short_title'  => 'P-3',
                'title'        => 'Rencana Penyelidikan',
                'case_type_id' => 202
            ],
            [
                'short_title'  => 'P-4',
                'title'        => 'Permintaan Keterangan',
                'case_type_id' => 202
            ],
            [
                'short_title'  => 'P-5',
                'title'        => 'Laporan Hasil Penyelidikan',
                'case_type_id' => 202
            ],
            [
                'short_title'  => 'P-6',
                'title'        => 'Laporan Terjadinya Tindak Pidana',
                'case_type_id' => 202
            ],
            [
                'short_title'  => 'P-7',
                'title'        => 'Matrik Perkara Tindak Pidana',
                'case_type_id' => 202
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
            ['id' => 1, 'name'  => 'Jaksa Agung', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 2, 'name'  => 'Jaksa Utama', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 3, 'name'  => 'Jaksa Utama Madya', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 4, 'name'  => 'Jaksa Utama Pratama', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 5, 'name'  => 'Jaksa Madya', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 6, 'name'  => 'Jaksa Muda', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 7, 'name'  => 'Jaksa Pratama', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 8, 'name'  => 'Ajun Jaksa', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 9, 'name'  => 'Ajun Jaksa Madya', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 10, 'name'  => 'Ajun Jaksa', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 11, 'name'  => 'Madya Darma TU', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 12, 'name'  => 'Madya Wira TU', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 13, 'name'  => 'Muda Darma TU', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 14, 'name'  => 'Muda Wira TU', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 15, 'name'  => 'Sena Darma TU', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 16, 'name'  => 'Sena Wira TU', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 17, 'name'  => 'Yuana Darma TU', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 18, 'name'  => 'Yuana Wira TU', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],                       

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
            ['id' => 101, 'name'  => 'Kajari Jember', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 102, 'name'  => 'Kasi Intelijen', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 103, 'name'  => 'Kasi Datun', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 104, 'name'  => 'Kasi Pidsus', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 105, 'name'  => 'Jaksa Penuntut Umum', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 106, 'name'  => 'Kasubag Pembinaan', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 107, 'name'  => 'Kasi Pidum', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 108, 'name'  => 'Pengelola Data Pegawai', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 109, 'name'  => 'Kaur Keuangan', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 110, 'name'  => 'Kaur Daskrimti & Perpustakaan', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 111, 'name'  => 'Penyiap Bahan Administrasi Perkara', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 112, 'name'  => 'Kaur Kelengkapan', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 113, 'name'  => 'Kaur Kepegawaian', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 114, 'name'  => 'Operator Simkari', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 115, 'name'  => 'Kaur Tata Usaha', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 116, 'name'  => 'Operator Komputer', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 117, 'name'  => 'Penyiap Bahan Intelijen', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 118, 'name'  => 'Pengawal Tahanan', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 119, 'name'  => 'Pembuat Laporan', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 120, 'name'  => 'Bendahara Pengeluaran', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 121, 'name'  => 'Bendahara Penerima', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 122, 'name'  => 'Petugas Penggandaan', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            ['id' => 123, 'name'  => 'Pengemudi', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
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
            ['id' => 202, 'name'  => 'Pidana Khusus', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],

            // ['id' => 211, 'name'  => 'Perdata - BANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 212, 'name'  => 'Perdata - THL', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 213, 'name'  => 'Perdata - TIMKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 214, 'name'  => 'Perdata - YANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],

            // ['id' => 221, 'name'  => 'PPH - BANKUM LITIGASI', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 222, 'name'  => 'PPH - BANKUM NON LITIGASI', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 223, 'name'  => 'PPH - THL', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 224, 'name'  => 'PPH - TIMKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 225, 'name'  => 'PPH - YANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],

            // ['id' => 231, 'name'  => 'TUN - BANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 232, 'name'  => 'TUN - THL', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 233, 'name'  => 'TUN - TIMKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
            // ['id' => 234, 'name'  => 'TUN - YANKUM', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],
        ];
        return DB::table('lookups')->insert($pangkat);
    }
}

class OfficerSeeder extends Seeder {

    public function run()
    {
        $now = Carbon::now()->toDateTimeString();

        // DB::table('officers')->truncate();

        // $jaksa = [
        //     [
        //         'name'       => "Eko Wahyudi, S.H., M.H.",
        //         'nip'        => "19800506 200501 1 006",
        //         'pangkat_id' => "3",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "Reza Prasetya Nitisasmita, S.H.",
        //         'nip'        => "197807726 200212 1 004",
        //         'pangkat_id' => "1",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "Endah Puspitorini, SH.",
        //         'nip'        => "19820419 20050 1 2010",
        //         'pangkat_id' => "3",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "Adik Sri Sumarsih, S.H., M.M.",
        //         'nip'        => "19710916 199803 2 002",
        //         'pangkat_id' => "4",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "Anak Agung Gede Hendrawan, S.H.",
        //         'nip'        => "19811023 200603 1 002",
        //         'pangkat_id' => "3",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "Lusiana, S.H.",
        //         'nip'        => "19730725 200003 2 002",
        //         'pangkat_id' => "4",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "I Made Adi Sudiantara, S.H.",
        //         'nip'        => "19691110 199803 1 001",
        //         'pangkat_id' => "4",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "Danni Arthana, S.H.",
        //         'nip'        => "19801209 200702 1 001",
        //         'pangkat_id' => "2",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "Eko Tjahjono, S.H., M.H.",
        //         'nip'        => "19671229 198803 1 002",
        //         'pangkat_id' => "5",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "Tendik Wicaksono, S.H., M.H.",
        //         'nip'        => "19781024 200501 1 004",
        //         'pangkat_id' => "3",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],

        // ];

        // foreach($jaksa as $data)
        // {
        //     $data['role'] = 'jaksa';
        //     DB::table('officers')->insert($data);
        // }

        // $staff = [
        //     [
        //         'name'       => "Staff 1",
        //         'nip'        => "0000001",
        //         'pangkat_id' => "1",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        //     [
        //         'name'       => "Staff 2",
        //         'nip'        => "0000002",
        //         'pangkat_id' => "1",
        //         'jabatan_id' => "101",
        //         'created_at' => $now,
        //         'updated_at' => $now
        //     ],
        // ];

        // foreach($staff as $data)
        // {
        //     $data['role'] = 'staff';
        //     DB::table('officers')->insert($data);
        // }

        return true;
    }
}

class SopSeeder extends Seeder {

    public function run()
    {
        DB::table('sop_phase')->truncate();
        DB::table('sop_checklist')->truncate();

        DB::table('sop_phase')->insert(
            [
                ['id' => 1, 'case_type_id' => 201, 'name' => 'Pra Penuntutan', 'duration' => 2, 'ordinal' => 1, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 2, 'case_type_id' => 201, 'name' => 'Tahap 1', 'duration' => 7, 'ordinal' => 2, 'icon' => '<strong>1</strong>'],
                ['id' => 3, 'case_type_id' => 201, 'name' => 'Tahap 2', 'duration' => 7, 'ordinal' => 3, 'icon' => '<strong>2</strong>'],
                ['id' => 4, 'case_type_id' => 201, 'name' => 'Penuntutan', 'duration' => 30, 'ordinal' => 4, 'icon' => '<i class="fa fa-legal"></i>'],
                ['id' => 5, 'case_type_id' => 201, 'name' => 'Tahap Persidangan', 'duration' => 60, 'ordinal' => 5, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 6, 'case_type_id' => 201, 'name' => 'Upaya Hukum', 'duration' => 60, 'ordinal' => 5, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 7, 'case_type_id' => 201, 'name' => 'Eksekusi', 'duration' => 60, 'ordinal' => 5, 'icon' => '<i class="fa fa-institution"></i>'],

                ['id' => 19, 'case_type_id' => 202, 'name' => 'Tahap Penyelidikan', 'duration' => 2, 'ordinal' => 1, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 20, 'case_type_id' => 202, 'name' => 'Tahap Penyidikan', 'duration' => 2, 'ordinal' => 1, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 21, 'case_type_id' => 202, 'name' => 'SPDP', 'duration' => 2, 'ordinal' => 1, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 22, 'case_type_id' => 202, 'name' => 'Tahap 1', 'duration' => 7, 'ordinal' => 2, 'icon' => '<strong>1</strong>'],
                ['id' => 23, 'case_type_id' => 202, 'name' => 'Tahap 2', 'duration' => 7, 'ordinal' => 3, 'icon' => '<strong>2</strong>'],
                ['id' => 24, 'case_type_id' => 202, 'name' => 'Penuntutan', 'duration' => 30, 'ordinal' => 4, 'icon' => '<i class="fa fa-legal"></i>'],
                ['id' => 25, 'case_type_id' => 202, 'name' => 'Tahap Persidangan', 'duration' => 60, 'ordinal' => 5, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 26, 'case_type_id' => 202, 'name' => 'Upaya Hukum', 'duration' => 60, 'ordinal' => 5, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 27, 'case_type_id' => 202, 'name' => 'Eksekusi', 'duration' => 60, 'ordinal' => 5, 'icon' => '<i class="fa fa-institution"></i>'],

                /* Datun Bankum*/
                ['id' => 31, 'case_type_id' => 211, 'name' => 'Persiapan', 'duration' => 30, 'ordinal' => 1, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 32, 'case_type_id' => 211, 'name' => 'Pelaksanaan', 'duration' => 448, 'ordinal' => 2, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 33, 'case_type_id' => 211, 'name' => 'Pelaporan', 'duration' => 60, 'ordinal' => 3, 'icon' => '<i class="fa fa-institution"></i>'],


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

        $checklists =
            [
                // PIDUM
                //Tahap Pra Penuntutan
                ['phase_id' => 1, 'name' => 'Penerimaan SPDP', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 1, 'related_data' => json_encode(['spdp_number', 'spdp_date']), 'date_label' => 'Tanggal SPDP Diterima'],
                ['phase_id' => 1, 'name' => 'P-16 Surat Perintah Penunjukan Penuntut Umum', 'ticker_id'=>1, 'duration' => 2, 'direction' => 'stay', 'ordinal' => 2, 'date_label' => 'Tanggal Surat'],
                ['phase_id' => 1, 'name' => 'P-17 Permintaan Perkembangan Hasil Penyidikan','ticker_id'=>2, 'duration' => 30, 'direction' => 'stay', 'ordinal' => 3, 'date_label' => 'Tanggal Surat'],
                ['phase_id' => 1, 'name' => 'SPDP Dikembalikan', 'ticker_id'=>3, 'duration' => 30, 'direction' => 'suspend', 'ordinal' => 4, 'date_label' => 'Tanggal Dikembalikan'],
                ['phase_id' => 1, 'name' => 'Penerimaan Berkas Tahap 1', 'duration' => 1, 'direction' => 'next', 'ordinal' => 5, 'date_label' => 'Tanggal Diterima'],

                //Tahap 1
                ['phase_id' => 2, 'name' => 'P-18 Hasil Penyidikan Belum Lengkap', 'ticker_id' => 5, 'duration' => 7, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' => 2, 'name' => 'P-19 Pengembalian Berkas Perkara untuk dilengkapi', 'ticker_id' => 5, 'duration' => 14, 'direction' => 'stay', 'ordinal' => 7],
                ['phase_id' => 2, 'name' => 'P-20 Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis (kesatu)', 'ticker_id' => 7, 'duration' => 30, 'direction' => 'stay', 'ordinal' => 8],
                ['phase_id' => 2, 'name' => 'P-20 Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis (kedua)', 'ticker_id' => 8, 'duration' => 30, 'direction' => 'stay', 'ordinal' => 9],
                ['phase_id' => 2, 'name' => 'P-20 Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis (ketiga)', 'ticker_id' => 9, 'duration' => 30, 'direction' => 'stay', 'ordinal' => 10],
                ['phase_id' => 2, 'name' => 'Berkara Perkas Dikembalikan', 'ticker_id' => 10, 'duration' => 30, 'direction' => 'suspend', 'ordinal' => 11],
                ['phase_id' => 2, 'name' => 'P-21 Pemberitahuan Hasil Penyidikan Sudah Lengkap', 'duration' => 0, 'direction' => 'next', 'ordinal' => 12],
                ['phase_id' => 2, 'name' => 'P-21A Pemberitahuan Susulan Hasil Penyidikan Sudah Lengkap', 'duration' => 0, 'direction' => 'next', 'ordinal' => 13],

                //Tahap 2
                ['phase_id' => 3, 'name' => 'Penerimaan Tersangka dan Barang Bukti', 'ticker_id' => 12,'duration' => 30, 'direction' => 'stay', 'ordinal' => 14],
                ['phase_id' => 3, 'name' => 'P-16A', 'duration' => 1, 'ticker_id'=>14,'duration'=>2, 'direction' => 'stay', 'ordinal' => 15],
                ['phase_id' => 3, 'name' => 'BA Pendapat Penahanan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 16],
                ['phase_id' => 3, 'name' => 'Surat Perintah Penahanan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 17],
                ['phase_id' => 3, 'name' => 'BA-10 Berita Acara Pelaksanaan Perintah Penahanan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 18],
                ['phase_id' => 3, 'name' => 'BA-15 Berita Acara Penerimaan dan Penelitian Tersangka', 'duration' => 0, 'direction' => 'next', 'ordinal' => 19],
                ['phase_id' => 3, 'name' => 'BA-18 Berita Acara Penerimaan dan Penelitian Benda Sitaan/Barang Bukti', 'duration' => 0, 'direction' => 'next', 'ordinal' => 20],

                //Tahap Penuntutan
                ['phase_id' => 4, 'name' => 'Pembuatan Surat Dakwaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 21],
                ['phase_id' => 4, 'name' => 'P-31 Pelimpahan Perkara ke Pengadilan', 'ticker_id'=>14, 'duration' => 15, 'direction' => 'next', 'ordinal' => 22],

                //Tahap Persidangan
                ['phase_id' => 5, 'name' => 'Pembacaan Dakwaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 23],
                ['phase_id' => 5, 'name' => 'Pembacaan Eksepsi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 24],
                ['phase_id' => 5, 'name' => 'Tanggapan Eksepsi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 25],
                ['phase_id' => 5, 'name' => 'Putusan Sela', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 26],
                ['phase_id' => 5, 'name' => 'Pemeriksaan Saksi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 27],
                ['phase_id' => 5, 'name' => 'Pemeriksaan Terdakwa', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 28],
                ['phase_id' => 5, 'name' => 'Pembacaan Surat Tuntutan', 'ticker_id'=>28, 'duration' => 3, 'direction' => 'stay', 'ordinal' => 29],
                ['phase_id' => 5, 'name' => 'Pembelaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 30],
                ['phase_id' => 5, 'name' => 'Tanggapan Pembelaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 31],
                ['phase_id' => 5, 'name' => 'Putusan', 'duration' => 0, 'direction' => 'next', 'ordinal' => 32],

                //Upaya Hukum
                ['phase_id' => 6, 'name' => 'Banding', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 33],
                ['phase_id' => 6, 'name' => 'Kasasi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 34],
                ['phase_id' => 6, 'name' => 'Peninjauan Kembali', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 35],
                ['phase_id' => 6, 'name' => 'Upaya Hukum Selesai', 'duration' => 0, 'direction' => 'next', 'ordinal' => 35],

                //Eksekusi
                ['phase_id' => 7, 'name' => 'P-44 Laporan JPU Segera Setelah Putusan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 36],
                ['phase_id' => 7, 'name' => 'P-45 Laporan Putusan Pengadilan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 37],
                ['phase_id' => 7, 'name' => 'P-48 Surat Perintah Pelaksanaan Putusan Pengadilan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 38],
                ['phase_id' => 7, 'name' => 'BA-8 Berita Acara Pelaksanaan Putusan Pengadilan', 'ticker_id'=>38, 'duration' => 0, 'direction' => 'stay', 'ordinal' => 39],
                ['phase_id' => 7, 'name' => 'P-53 Kartu Perkara Tindak Pidana', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 40],
                ['phase_id' => 7, 'name' => 'Pengarsipan', 'duration' => 0, 'direction' => 'finish', 'ordinal' => 41],

                // PIDSUS

                // Penyelidikan
                ['phase_id' => 19, 'name' => 'P-1 Penerimaan Laporan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 1],
                ['phase_id' => 19, 'name' => 'P-2 Surat Perintah Penyelidikan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 2],
                ['phase_id' => 19, 'name' => 'P-3 Rencana Penyelidikan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 3],
                ['phase_id' => 19, 'name' => 'P-4 Permintaan Keterangan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 4],
                ['phase_id' => 19, 'name' => 'P-5 Laporan Hasil Penyelidikan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 5],
                ['phase_id' => 19, 'name' => 'P-6 Laporan Terjadinya Tindak Pidana', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 6],
                ['phase_id' => 19, 'name' => 'P-7 Matrik Perkara Tindak Pidana', 'duration' => 1, 'direction' => 'next', 'ordinal' => 7],

                // Penyidikan
                ['phase_id' => 20, 'name' => 'P-8 Surat Perintah Penyidikan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 8],
                ['phase_id' => 20, 'name' => 'P-9 Surat Panggilan Saksi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 9],
                ['phase_id' => 20, 'name' => 'P-10 Bantuan Keterangan Ahli', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 10],
                ['phase_id' => 20, 'name' => 'P-11 Bantuan Pemanggilan Saksi Ahli', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 11],
                ['phase_id' => 20, 'name' => 'P-12 Laporan Perkembangan Penyidikan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 12],
                ['phase_id' => 20, 'name' => 'P-13 Usul Penghentian Penyidikan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 13],
                ['phase_id' => 20, 'name' => 'P-14 Surat Perintah Penghentian Penyidikan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 14],
                ['phase_id' => 20, 'name' => 'P-15 Surat Perintah Penyerahan Berkas Perkara', 'duration' => 1, 'direction' => 'next', 'ordinal' => 15],

                // SPDP
                ['phase_id' => 21, 'name' => 'Penerimaan SPDP', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 16],
                ['phase_id' => 21, 'name' => 'P-16 Surat Perintah Penunjukan Penuntut Umum', 'duration' => 1, 'direction' => 'next', 'ordinal' => 17],
                ['phase_id' => 21, 'name' => 'P-17 Permintaan Perkembangan Hasil Penyidikan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 18],
                ['phase_id' => 21, 'name' => 'SPDP Dikembalikan', 'duration' => 1, 'direction' => 'stop', 'ordinal' => 19],

                // Tahap 1
                ['phase_id' => 22, 'name' => 'Penerimaan Berkas Tahap 1', 'duration' => 1, 'direction' => 'next', 'ordinal' => 20],
                ['phase_id' => 22, 'name' => 'P-18 Hasil Penyidikan Belum Lengkap', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 21],
                ['phase_id' => 22, 'name' => 'P-19 Pengembalian Berkas Perkara untuk dilengkapi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 22],
                ['phase_id' => 22, 'name' => 'P-20 Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 23],
                ['phase_id' => 22, 'name' => 'P-21 Pemberitahuan Hasil Penyidikan Sudah Lengkap', 'duration' => 1, 'direction' => 'next', 'ordinal' => 24],
                ['phase_id' => 22, 'name' => 'P-21A Pemberitahuan Susulan Hasil Penyidikan Sudah Lengkap', 'duration' => 1, 'direction' => 'next', 'ordinal' => 25],
                ['phase_id' => 22, 'name' => 'Berkara Perkas Dikembalikan', 'duration' => 1, 'direction' => 'stop', 'ordinal' => 26],

                // Tahap 2
                ['phase_id' => 23, 'name' => 'Penerimaan Tersangka dan Barang Bukti', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 27],
                ['phase_id' => 23, 'name' => 'P-16A', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 28],
                ['phase_id' => 23, 'name' => 'BA Pendapat Penahanan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 29],
                ['phase_id' => 23, 'name' => 'Surat Perintah Penahanan', 'duration' => 1, 'direction' => 'next', 'ordinal' => 30],
                ['phase_id' => 23, 'name' => 'BA-10 Berita Acara Perintah Pelaksanaan Perintah Penahanan - Penahanan Lanjutan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 31],
                ['phase_id' => 23, 'name' => 'BA-15 Berita Acara Penerimaan dan Penelitian Tersangka', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 32],
                ['phase_id' => 23, 'name' => 'BA-18 Berita Acara Penerimaan dan Penelitian Benda Sitaan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 33],

                // Penuntutan
                ['phase_id' => 24, 'name' => 'P-31 Pelimpahan Perkara ke Pengadilan', 'duration' => 1, 'direction' => 'next', 'ordinal' => 34],
                ['phase_id' => 24, 'name' => 'Pembacaan Surat Dakwaan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 35],
                ['phase_id' => 24, 'name' => 'Tanggapan Terhadap Eksepsi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 36],

                // Persidangan
                ['phase_id' => 25, 'name' => 'Pembacaan Dakwaan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 37],
                ['phase_id' => 25, 'name' => 'Pembacaan Eksepsi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 38],
                ['phase_id' => 25, 'name' => 'Tanggapan Eksepsi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 39],
                ['phase_id' => 25, 'name' => 'Putusan Sela', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 40],
                ['phase_id' => 25, 'name' => 'Pemeriksaan Saksi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 41],
                ['phase_id' => 25, 'name' => 'Pemeriksaan Terdakwa', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 42],
                ['phase_id' => 25, 'name' => 'Pembacaan Surat Tuntutan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 43],
                ['phase_id' => 25, 'name' => 'Pembelaan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 44],
                ['phase_id' => 25, 'name' => 'Tanggapan Pembelaan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 45],
                ['phase_id' => 25, 'name' => 'Putusan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 46],

                // Upaya Hukum
                ['phase_id' => 26, 'name' => 'Banding', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 47],
                ['phase_id' => 26, 'name' => 'Kasasi', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 48],
                ['phase_id' => 26, 'name' => 'Peninjauan Kembali', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 49],

                // Eksekusi
                ['phase_id' => 27, 'name' => 'P-44', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 50],
                ['phase_id' => 27, 'name' => 'P-45', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 51],
                ['phase_id' => 27, 'name' => 'P-48', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 52],
                ['phase_id' => 27, 'name' => 'BA-8', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 53],
                ['phase_id' => 27, 'name' => 'P-53', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 54],
                ['phase_id' => 27, 'name' => 'Pengarsipan', 'duration' => 1, 'direction' => 'stay', 'ordinal' => 55],
            ];
        foreach($checklists as $data)
        {
            DB::table('sop_checklist')->insert($data);
        }
        return true;
    }
}

class PostSeeder extends Seeder{

    public function run()
    {
        $authorId = 1;
        $faker = Factory::create();
        $now = Carbon::now()->toDateTimeString();
        $posts = [];

        foreach(range(1, 10) as $item)
        {
            $posts[] = ['author_id' => $authorId, 'title' => $faker->sentence(5), 'content' => $faker->paragraph(10), 'position' => $faker->randomElement(['pembinaan', 'intelijen']), 'created_at' => $now, 'updated_at' => $now];
        }

        return DB::table('posts')->insert($posts);
    }
}

class SettingSeeder extends Seeder{

    public function run()
    {
        return DB::table('settings')->insert([
            ['key' => 'kajari_name', 'value' => ''],
            ['key' => 'kajari_nip', 'value' => ''],
            ['key' => 'kajari_jabatan', 'value' => ''],
            ['key' => 'kepala_kejaksaan_provinsi', 'value' => ''],
            ['key' => 'kepala_kepolisian', 'value' => '']
        ]);
    }
}
