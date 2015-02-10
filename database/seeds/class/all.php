<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

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
                'case_type_id' => 201,
                'checklist_id' => 2
            ],
            [
                'short_title' => 'P-17',
                'title' => 'Permintaan Perkembangan Hasil Penyidikan',
                'case_type_id' => 201,
                'checklist_id' => 3
            ],
            [
                'short_title' => 'P-17-a',
                'title' => 'Pengembalian SPDP setelah P-17',
                'case_type_id' => 201,
                'checklist_id' => 4
            ],

            [
                'short_title'  => 'P-7',
                'title'        => 'Matrik Perkara Tindak Pidana',
                'case_type_id' => 201,
                'checklist_id' => null
            ],
            [
                'short_title' => 'P-18',
                'title' => 'Hasil Penyidikan Belum Lengkap',
                'case_type_id' => 201,
                'checklist_id' => 6
            ],
            [
                'short_title' => 'P-19',
                'title' => 'Pengembalian Berkas Perkara untuk dilengkapi',
                'case_type_id' => 201,
                'checklist_id' => 7
            ],
            [
                'short_title' => 'P-20',
                'title' => 'Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis',
                'case_type_id' => 201,
                'checklist_id' => 8
            ],
            [
                'short_title' => 'P-20-a',
                'title' => 'Pengembalian SPDP setelah P-20',
                'case_type_id' => 201,
                'checklist_id' => 11
            ],
            [
                'short_title' => 'P-21',
                'title' => 'Pemberitahuan Hasil Penyidikan Sudah Lengkap',
                'case_type_id' => 201,
                'checklist_id' => 12
            ],
            [
                'short_title' => 'P-21A',
                'title' => 'Pemberitahuan Susulan Hasil Penyidikan Sudah Lengkap',
                'case_type_id' => 201,
                'checklist_id' => 13
            ],
            [
                'short_title' => 'P-16A',
                'title' => 'Surat Perintah Penunjukan JPU untuk Penyelesaian Perkara Tindak Pidana',
                'case_type_id' => 201,
                'checklist_id' => 15
            ],
            [
                'short_title' => 'T-7',
                'title' => 'Surat Perintah Penahanan',
                'case_type_id' => 201,
                'checklist_id' => 17
            ],
            [
                'short_title' => 'P-31',
                'title' => 'Surat Pelimpahan Perkara Acara Pemeriksaan Biasa (APB)',
                'case_type_id' => 201,
                'checklist_id' => 22
            ],
            [
                'short_title' => 'P-44',
                'title' => 'Laporan JPU Segera Setelah Putusan',
                'case_type_id' => 201,
                'checklist_id' => 37
            ],
            [
                'short_title' => 'P-45',
                'title' => 'Laporan Putusan Pengadilan',
                'case_type_id' => 201,
                'checklist_id' => 38
            ],
            [
                'short_title' => 'P-48',
                'title' => 'Surat Perintah Pelaksanaan Putusan Pengadilan',
                'case_type_id' => 201,
                'checklist_id' => 39
            ],
            [
                'short_title' => 'P-53',
                'title' => 'Kartu Perkara Tindak Pidana',
                'case_type_id' => 201,
                'checklist_id' => 41
            ],
            [
                'short_title' => 'BA-8',
                'title' => 'Berita Acara Pelaksanaan Putusan Pengadilan',
                'case_type_id' => 201,
                'checklist_id' => 40
            ],
            [
                'short_title' => 'BA-10',
                'title' => 'Berita Acara Perintah Pelaksanaan Perintah Penahanan - Penahanan Lanjutan',
                'case_type_id' => 201,
                'checklist_id' => 18
            ],
            [
                'short_title' => 'BA-15',
                'title' => 'Berita Acara Penerimaan dan Penelitian Tersangka',
                'case_type_id' => 201,
                'checklist_id' => 19
            ],
            [
                'short_title' => 'BA-18',
                'title' => 'Berita Acara Penerimaan dan Penelitian Benda Sitaan - Barang Bukti',
                'case_type_id' => 201,
                'checklist_id' => 20
            ],

            // PIDSUS

            // PENYELIDIKAN
            [
                'short_title'  => 'P-1',
                'title'        => 'Penerimaan Laporan',
                'case_type_id' => 202,
                'checklist_id' => null
            ],
            [
                'short_title'  => 'P-2',
                'title'        => 'Surat Perintah Penyelidikan',
                'case_type_id' => 202,
                'checklist_id' => 45
            ],
            [
                'short_title'  => 'P-3',
                'title'        => 'Rencana Penyelidikan',
                'case_type_id' => 202,
                'checklist_id' => 46
            ],
            [
                'short_title'  => 'P-4',
                'title'        => 'Permintaan Keterangan',
                'case_type_id' => 202,
                'checklist_id' => 47
            ],
            [
                'short_title'  => 'P-5',
                'title'        => 'Laporan Hasil Penyelidikan',
                'case_type_id' => 202,
                'checklist_id' => 48
            ],
            [
                'short_title'  => 'P-6',
                'title'        => 'Laporan Terjadinya Tindak Pidana',
                'case_type_id' => 202,
                'checklist_id' => 49
            ],
            [
                'short_title'  => 'P-7',
                'title'        => 'Matrik Perkara Tindak Pidana',
                'case_type_id' => 202,
                'checklist_id' => 50
            ],
            [
                'short_title' => 'P-16',
                'title' => 'Surat Perintah Penunjukan JPU untuk mengikuti Perkembangan Penyidikan perkara tindak pidana',
                'case_type_id' => 202,
                'checklist_id' => 68
            ],
            [
                'short_title' => 'P-17',
                'title' => 'Permintaan Perkembangan Hasil Penyidikan',
                'case_type_id' => 202,
                'checklist_id' => 69
            ],
            [
                'short_title' => 'P-17-a',
                'title' => 'Pengembalian SPDP setelah P-17',
                'case_type_id' => 202,
                'checklist_id' => 70
            ],
            [
                'short_title' => 'P-18',
                'title' => 'Hasil Penyidikan Belum Lengkap',
                'case_type_id' => 202,
                'checklist_id' => 74
            ],
            [
                'short_title' => 'P-19',
                'title' => 'Pengembalian Berkas Perkara untuk dilengkapi',
                'case_type_id' => 202,
                'checklist_id' => 75
            ],
            [
                'short_title' => 'P-20',
                'title' => 'Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis',
                'case_type_id' => 202,
                'checklist_id' => 76
            ],
            [
                'short_title' => 'P-20-a',
                'title' => 'Pengembalian SPDP setelah P-20',
                'case_type_id' => 202,
                'checklist_id' => 79
            ],
            [
                'short_title' => 'P-21',
                'title' => 'Pemberitahuan Hasil Penyidikan Sudah Lengkap',
                'case_type_id' => 202,
                'checklist_id' => 77
            ],
            [
                'short_title' => 'P-21A',
                'title' => 'Pemberitahuan Susulan Hasil Penyidikan Sudah Lengkap',
                'case_type_id' => 202,
                'checklist_id' => 78
            ],
            [
                'short_title' => 'P-16A',
                'title' => 'Surat Perintah Penunjukan JPU untuk Penyelesaian Perkara Tindak Pidana',
                'case_type_id' => 202,
                'checklist_id' => 81
            ],
            [
                'short_title' => 'T-7',
                'title' => 'Surat Perintah Penahanan',
                'case_type_id' => 202,
                'checklist_id' => 83
            ],
            [
                'short_title' => 'P-31',
                'title' => 'Surat Pelimpahan Perkara Acara Pemeriksaan Biasa (APB)',
                'case_type_id' => 202,
                'checklist_id' => 88
            ],
            [
                'short_title' => 'P-44',
                'title' => 'Laporan JPU Segera Setelah Putusan',
                'case_type_id' => 202,
                'checklist_id' => 104
            ],
            [
                'short_title' => 'P-45',
                'title' => 'Laporan Putusan Pengadilan',
                'case_type_id' => 202,
                'checklist_id' => 107
            ],
            [
                'short_title' => 'P-48',
                'title' => 'Surat Perintah Pelaksanaan Putusan Pengadilan',
                'case_type_id' => 202,
                'checklist_id' => 112
            ],
            [
                'short_title' => 'P-53',
                'title' => 'Kartu Perkara Tindak Pidana',
                'case_type_id' => 202,
                'checklist_id' => 115
            ],
            [
                'short_title' => 'BA-8',
                'title' => 'Berita Acara Pelaksanaan Putusan Pengadilan',
                'case_type_id' => 202,
                'checklist_id' => null
            ],
            [
                'short_title' => 'BA-10',
                'title' => 'Berita Acara Perintah Pelaksanaan Perintah Penahanan - Penahanan Lanjutan',
                'case_type_id' => 202,
                'checklist_id' => 84
            ],
            [
                'short_title' => 'BA-15',
                'title' => 'Berita Acara Penerimaan dan Penelitian Tersangka',
                'case_type_id' => 202,
                'checklist_id' => 85
            ],
            [
                'short_title' => 'BA-18',
                'title' => 'Berita Acara Penerimaan dan Penelitian Benda Sitaan - Barang Bukti',
                'case_type_id' => 202,
                'checklist_id' => 86
            ],
        ];

        return DB::table('templates')->insert($template);
    }
}

class RootSeeder extends Seeder {

    public function run()
    {
        $user = [
            [
                'name'  => 'Root',
                'email'  => 'root@palapa.dev',
                'password'  => Hash::make('root')
            ]
        ];
        DB::table('users')->truncate();
        return DB::table('users')->insert($user);
    }

}

class StaffSeeder extends Seeder {

    public function run()
    {
        $user = [
            [
                'id'    => 2,
                'name'  => 'Pidana Umum',
                'email'  => 'pidum',
                'password'  => Hash::make('pidum1234')
            ],
            [
                'id'    => 3,
                'name'  => 'Pidana Khusus',
                'email'  => 'pidsus',
                'password'  => Hash::make('pidsus1234')
            ]

        ];
        return DB::table('users')->insert($user);
    }

}

class GroupSeeder extends Seeder {

    public function run()
    {
        $groups = [
            ['name' => 'root', 'description' => 'Super user'],
            ['name' => 'pidum', 'description' => 'Staff Pidum'],
            ['name' => 'pidsus', 'description' => 'Staff Pidsus'],
            ['name' => 'datun', 'description' => 'Staff Datun'],
            ['name' => 'jaksa', 'description' => 'staff'],
            ['name' => 'staff', 'description' => 'jaksa'],
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
            ['user_id'  => 3, 'group_id'  => 3],
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
            ['id' => 203, 'name'  => 'Datun', 'type'  => $type, 'created_at' => $now, 'updated_at' => $now],

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

        DB::table('officers')->truncate();

        DB::insert(file_get_contents(base_path()."/database/seeds/officer.sql"));
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
                //PIDUM
                ['id' => 1, 'case_type_id' => 201, 'name' => 'Pra Penuntutan', 'duration' => 30, 'ordinal' => 1, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 2, 'case_type_id' => 201, 'name' => 'Tahap 1', 'duration' => 14, 'ordinal' => 2, 'icon' => '<strong>1</strong>'],
                ['id' => 3, 'case_type_id' => 201, 'name' => 'Tahap 2', 'duration' => 20, 'ordinal' => 3, 'icon' => '<strong>2</strong>'],
                ['id' => 4, 'case_type_id' => 201, 'name' => 'Penuntutan', 'duration' => 0, 'ordinal' => 4, 'icon' => '<i class="fa fa-legal"></i>'],
                ['id' => 5, 'case_type_id' => 201, 'name' => 'Tahap Persidangan', 'duration' => 0, 'ordinal' => 5, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 6, 'case_type_id' => 201, 'name' => 'Upaya Hukum', 'duration' => 0, 'ordinal' => 6, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 7, 'case_type_id' => 201, 'name' => 'Eksekusi', 'duration' => 0, 'ordinal' => 7, 'icon' => '<i class="fa fa-institution"></i>'],


                //PIDSUS
                ['id' => 19, 'case_type_id' => 202, 'name' => 'Tahap Pra Penyelidikan', 'duration' => 11, 'ordinal' => 1, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 20, 'case_type_id' => 202, 'name' => 'Tahap Penyelidikan', 'duration' => 72, 'ordinal' => 2, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 21, 'case_type_id' => 202, 'name' => 'Tahap Penyidikan', 'duration' => 120, 'ordinal' => 3, 'icon' => '<i class="fa fa-file-o"></i>'],
                ['id' => 22, 'case_type_id' => 202, 'name' => 'Pra Penuntutan', 'duration' => 27, 'ordinal' => 4, 'icon' => '<strong>1</strong>'],
                ['id' => 23, 'case_type_id' => 202, 'name' => 'Penuntutan', 'duration' => 28, 'ordinal' => 5, 'icon' => '<strong>2</strong>'],
                ['id' => 24, 'case_type_id' => 202, 'name' => 'Persidangan', 'duration' => 120, 'ordinal' => 6, 'icon' => '<i class="fa fa-legal"></i>'],
                ['id' => 25, 'case_type_id' => 202, 'name' => 'Upaya Hukum dan Eksekusi', 'duration' => 0, 'ordinal' => 7, 'icon' => '<i class="fa fa-institution"></i>'],

                /* Datun */
                ['id' => 31, 'case_type_id' => 203, 'name' => 'Persiapan', 'duration' => 30, 'ordinal' => 1, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 32, 'case_type_id' => 203, 'name' => 'Pelaksanaan', 'duration' => 448, 'ordinal' => 2, 'icon' => '<i class="fa fa-institution"></i>'],
                ['id' => 33, 'case_type_id' => 203, 'name' => 'Pelaporan', 'duration' => 60, 'ordinal' => 3, 'icon' => '<i class="fa fa-institution"></i>'],

            ]
        );

        $checklists =
            [
                // PIDUM
                //Tahap Pra Penuntutan
                ['id'=>1,'phase_id' => 1, 'name' => 'Penerimaan SPDP', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 1, 'related_data' => json_encode(['spdp_number', 'spdp_date']), 'date_label' => 'Tanggal SPDP Diterima'],
                ['id'=>2,'phase_id' => 1, 'name' => 'P-16 Surat Perintah Penunjukan Penuntut Umum', 'ticker_id'=>1, 'duration' => 2, 'direction' => 'stay', 'ordinal' => 2, 'date_label' => 'Tanggal Surat'],
                ['id'=>3,'phase_id' => 1, 'name' => 'P-17 Permintaan Perkembangan Hasil Penyidikan','ticker_id'=>2, 'duration' => 30, 'direction' => 'stay', 'ordinal' => 3, 'date_label' => 'Tanggal Surat'],
                ['id'=>4,'phase_id' => 1, 'name' => 'SPDP Dikembalikan Ke Penyidik', 'ticker_id'=>3, 'duration' => 30, 'direction' => 'suspend', 'ordinal' => 4, 'date_label' => 'Tanggal Dikembalikan'],
                ['id'=>5,'phase_id' => 1, 'name' => 'Penerimaan Berkas Tahap 1', 'duration' => 1, 'direction' => 'next', 'ordinal' => 5, 'date_label' => 'Tanggal Diterima'],

                //Tahap 1
                ['id'=>6,'phase_id' => 2, 'name' => 'P-18 Hasil Penyidikan Belum Lengkap', 'ticker_id' => 5, 'duration' => 7, 'direction' => 'stay', 'ordinal' => 6],
                ['id'=>7,'phase_id' => 2, 'name' => 'P-19 Pengembalian Berkas Perkara untuk dilengkapi', 'ticker_id' => 5, 'duration' => 14, 'direction' => 'stay', 'ordinal' => 7],
                ['id'=>8,'phase_id' => 2, 'name' => 'P-20 Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis (kesatu)', 'ticker_id' => 7, 'duration' => 30, 'direction' => 'stay', 'ordinal' => 8],
                ['id'=>9,'phase_id' => 2, 'name' => 'P-20 Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis (kedua)', 'ticker_id' => 8, 'duration' => 30, 'direction' => 'stay', 'ordinal' => 9],
                ['id'=>10,'phase_id' => 2, 'name' => 'P-20 Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis (ketiga)', 'ticker_id' => 9, 'duration' => 30, 'direction' => 'stay', 'ordinal' => 10],
                ['id'=>11,'phase_id' => 2, 'name' => 'Berkas Perkara Dikembalikan Ke Penyidik', 'ticker_id' => 10, 'duration' => 30, 'direction' => 'suspend', 'ordinal' => 11],
                ['id'=>12,'phase_id' => 2, 'name' => 'P-21 Pemberitahuan Hasil Penyidikan Sudah Lengkap', 'duration' => 0, 'direction' => 'next', 'ordinal' => 12],
                ['id'=>13,'phase_id' => 2, 'name' => 'P-21A Pemberitahuan Susulan Hasil Penyidikan Sudah Lengkap', 'duration' => 0, 'direction' => 'next', 'ordinal' => 13],

                //Tahap 2
                ['id'=>14,'phase_id' => 3, 'name' => 'Penerimaan Tersangka dan Barang Bukti', 'ticker_id' => 12,'duration' => 30, 'direction' => 'stay', 'ordinal' => 14],
                ['id'=>15,'phase_id' => 3, 'name' => 'P-16A', 'duration' => 1, 'ticker_id'=>14,'duration'=>2, 'direction' => 'stay', 'ordinal' => 15],
                ['id'=>16,'phase_id' => 3, 'name' => 'BA Pendapat Penahanan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 16],
                ['id'=>17,'phase_id' => 3, 'name' => 'Surat Perintah Penahanan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 17],
                ['id'=>18,'phase_id' => 3, 'name' => 'BA-10 Berita Acara Pelaksanaan Perintah Penahanan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 18],
                ['id'=>19,'phase_id' => 3, 'name' => 'BA-15 Berita Acara Penerimaan dan Penelitian Tersangka', 'duration' => 0, 'direction' => 'next', 'ordinal' => 19],
                ['id'=>20,'phase_id' => 3, 'name' => 'BA-18 Berita Acara Penerimaan dan Penelitian Benda Sitaan/Barang Bukti', 'duration' => 0, 'direction' => 'next', 'ordinal' => 20],

                //Tahap Penuntutan
                ['id'=>21,'phase_id' => 4, 'name' => 'Pembuatan Surat Dakwaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 21],
                ['id'=>22,'phase_id' => 4, 'name' => 'P-31 Pelimpahan Perkara ke Pengadilan', 'ticker_id'=>14, 'duration' => 15, 'direction' => 'next', 'ordinal' => 22,'related_data' => json_encode(['persidangan_date']), 'date_label' => 'Tanggal Pelimpahan'],

                //Tahap Persidangan
                ['id'=>23,'phase_id' => 5, 'name' => 'Pembacaan Dakwaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 23],
                ['id'=>24,'phase_id' => 5, 'name' => 'Pembacaan Eksepsi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 24],
                ['id'=>25,'phase_id' => 5, 'name' => 'Tanggapan Eksepsi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 25],
                ['id'=>26,'phase_id' => 5, 'name' => 'Putusan Sela', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 26],
                ['id'=>27,'phase_id' => 5, 'name' => 'Pemeriksaan Saksi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 27],
                ['id'=>28,'phase_id' => 5, 'name' => 'Pemeriksaan Terdakwa', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 28],
                ['id'=>29,'phase_id' => 5, 'name' => 'Pembacaan Surat Tuntutan', 'ticker_id'=>28, 'duration' => 3, 'direction' => 'stay', 'ordinal' => 29],
                ['id'=>30,'phase_id' => 5, 'name' => 'Pembelaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 30],
                ['id'=>31,'phase_id' => 5, 'name' => 'Tanggapan Pembelaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 31],
                ['id'=>32,'phase_id' => 5, 'name' => 'Putusan', 'duration' => 0, 'direction' => 'next', 'ordinal' => 32],

                //Upaya Hukum
                ['id'=>33,'phase_id' => 6, 'name' => 'Banding', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 33],
                ['id'=>34,'phase_id' => 6, 'name' => 'Kasasi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 34],
                ['id'=>35,'phase_id' => 6, 'name' => 'Peninjauan Kembali', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 35],
                ['id'=>36,'phase_id' => 6, 'name' => 'Upaya Hukum Selesai', 'duration' => 0, 'direction' => 'next', 'ordinal' => 35],

                //Eksekusi
                ['id'=>37,'phase_id' => 7, 'name' => 'P-44 Laporan JPU Segera Setelah Putusan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 36],
                ['id'=>38,'phase_id' => 7, 'name' => 'P-45 Laporan Putusan Pengadilan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 37],
                ['id'=>39,'phase_id' => 7, 'name' => 'P-48 Surat Perintah Pelaksanaan Putusan Pengadilan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 38],
                ['id'=>40,'phase_id' => 7, 'name' => 'BA-8 Berita Acara Pelaksanaan Putusan Pengadilan', 'ticker_id'=>38, 'duration' => 0, 'direction' => 'stay', 'ordinal' => 39],
                ['id'=>41,'phase_id' => 7, 'name' => 'P-53 Kartu Perkara Tindak Pidana', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 40],
                ['id'=>42,'phase_id' => 7, 'name' => 'Pengarsipan', 'duration' => 0, 'direction' => 'finish', 'ordinal' => 41],

                // PIDSUS

                // Pra Penyelidikan
                ['id'=>43,'phase_id' => 19, 'name' => 'Penerimaan Berkas Sumber Penyelidikan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 1],
                ['id'=>44,'phase_id' => 19, 'name' => 'Surat Tugas Survailance Pengumpulan Data dan Bahan Keterangan', 'duration' => 0, 'direction' => 'next', 'ordinal' => 2],

                //Tahap Penyelidikan
                ['id'=>45,'phase_id' => 20, 'name' => 'P-2 Surat Perintah Penyelidikan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 3],
                ['id'=>46,'phase_id' => 20, 'name' => 'P-3 Rencana Penyelidikan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 4],
                ['id'=>47,'phase_id' => 20, 'name' => 'Pidsus-5A Permintaan Keterangan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 5],
                ['id'=>48,'phase_id' => 20, 'name' => 'P-5 Laporan Hasil Penyelidikan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 6],
                ['id'=>49,'phase_id' => 20, 'name' => 'P-6 Laporan Terjadinya Tindak Pidana', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 7],
                ['id'=>50,'phase_id' => 20, 'name' => 'P-7 Matrik Perkara Tindak Pidana', 'duration' => 0, 'direction' => 'next', 'ordinal' => 8],

                // Penyidikan
                ['id'=>51,'phase_id' => 21, 'name' => 'P-8 Surat Perintah Penyidikan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 9],
                ['id'=>52,'phase_id' => 21, 'name' => 'PIDSUS-18 Surat Penetapan Tersangka', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 10],
                ['id'=>53,'phase_id' => 21, 'name' => 'PIDSUS-13 Surat Pemberitahuan Dimulainya Penyidikan (SPDP)', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 11],
                ['id'=>54,'phase_id' => 21, 'name' => 'P-9 Surat Panggilan Saksi/Tersangka', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 12],
                ['id'=>55,'phase_id' => 21, 'name' => 'P-10 Bantuan Keterangan Ahli', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 13],
                ['id'=>56,'phase_id' => 21, 'name' => 'P-11 Bantuan Pemanggilan Saksi Ahli', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 14],
                ['id'=>57,'phase_id' => 21, 'name' => 'B-4 Surat Perintah Penyitaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 15],
                ['id'=>58,'phase_id' => 21, 'name' => 'BA-16 Berita Acara Penyitaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 16],
                ['id'=>59,'phase_id' => 21, 'name' => 'P-12 Laporan Perkembangan Penyidikan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 17],
                ['id'=>60,'phase_id' => 21, 'name' => 'P-13 Usul Penghentian Penyidikan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 18],
                ['id'=>61,'phase_id' => 21, 'name' => 'P-14 Surat Perintah Penghentian Penyidikan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 19],
                ['id'=>62,'phase_id' => 21, 'name' => 'BA-5 Berita Acara Pendapat (Resume)', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 20],
                ['id'=>63,'phase_id' => 21, 'name' => 'T-2 Surat Perintah Penahanan (Tingkat Penyidikan)', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 21],
                ['id'=>64,'phase_id' => 21, 'name' => 'BA-10 Berita Acara Penahanan (Tingkat Penyidikan)', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 22],
                ['id'=>65,'phase_id' => 21, 'name' => 'T-4 Surat Perpanjangan Penahanan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 23],
                ['id'=>66,'phase_id' => 21, 'name' => 'P-15 Surat Perintah Penyerahan Berkas Perkara', 'duration' => 0, 'direction' => 'next', 'ordinal' => 24],

                // Pra Penuntutan
                ['id'=>67,'phase_id' => 22, 'name' => 'Penerimaan SPDP', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 25],
                ['id'=>68,'phase_id' => 22, 'name' => 'P-16 Surat Perintah Penunjukan Penuntut Umum', 'duration' => 0, 'direction' => 'next', 'ordinal' => 26],
                ['id'=>69,'phase_id' => 22, 'name' => 'P-17 Permintaan Perkembangan Hasil Penyidikan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 27],
                ['id'=>70,'phase_id' => 22, 'name' => 'SPDP Dikembalikan Ke Penyidik', 'duration' => 0, 'direction' => 'suspend', 'ordinal' => 28],
                ['id'=>71,'phase_id' => 22, 'name' => 'Penerimaan Berkas Tahap 1', 'duration' => 0, 'direction' => 'next', 'ordinal' => 29],
                ['id'=>72,'phase_id' => 22, 'name' => 'P-24 Berita Acara Pendapat', 'duration' => 0, 'direction' => 'next', 'ordinal' => 30],
                ['id'=>73,'phase_id' => 22, 'name' => 'P-7 Matrik Perkara Tindak Pidana', 'duration' => 0, 'direction' => 'next', 'ordinal' => 31],
                ['id'=>74,'phase_id' => 22, 'name' => 'P-18 Hasil Penyidikan Belum Lengkap', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 32],
                ['id'=>75,'phase_id' => 22, 'name' => 'P-19 Pengembalian Berkas Perkara untuk dilengkapi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 33],
                ['id'=>76,'phase_id' => 22, 'name' => 'P-20 Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 34],
                ['id'=>77,'phase_id' => 22, 'name' => 'P-21 Pemberitahuan Hasil Penyidikan Sudah Lengkap', 'duration' => 0, 'direction' => 'next', 'ordinal' => 35],
                ['id'=>78,'phase_id' => 22, 'name' => 'P-21A Pemberitahuan Susulan Hasil Penyidikan Sudah Lengkap', 'duration' => 0, 'direction' => 'next', 'ordinal' => 36],
                ['id'=>79,'phase_id' => 22, 'name' => 'Berkas Perkara Dikembalikan Ke Penyidik', 'duration' => 1, 'direction' => 'suspend', 'ordinal' => 37],

                // Penuntutan
                ['id'=>80,'phase_id' => 23, 'name' => 'Penerimaan Tersangka dan Barang Bukti', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 38],
                ['id'=>81,'phase_id' => 23, 'name' => 'P-16A', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 39],
                ['id'=>82,'phase_id' => 23, 'name' => 'BA Pendapat Penahanan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 40],
                ['id'=>83,'phase_id' => 23, 'name' => 'T-7 Surat Perintah Penahanan', 'duration' => 0, 'direction' => 'next', 'ordinal' => 41],
                ['id'=>84,'phase_id' => 23, 'name' => 'BA-10 Berita Acara Perintah Pelaksanaan Perintah Penahanan - Penahanan Lanjutan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 42],
                ['id'=>85,'phase_id' => 23, 'name' => 'BA-15 Berita Acara Penerimaan dan Penelitian Tersangka', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 43],
                ['id'=>86,'phase_id' => 23, 'name' => 'BA-18 Berita Acara Penerimaan dan Penelitian Benda Sitaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 44],
                ['id'=>87,'phase_id' => 23, 'name' => 'P-29 Surat Dakwaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 45],
                ['id'=>88,'phase_id' => 23, 'name' => 'P-31 Pelimpahan Perkara ke Pengadilan', 'duration' => 0, 'direction' => 'next', 'ordinal' => 46],
                ['id'=>89,'phase_id' => 23, 'name' => 'P-33 Tanda Terima Surat Pelimpahan Perkara Acara Pemeriksaan Biasa', 'duration' => 0, 'direction' => 'next', 'ordinal' => 47],
                ['id'=>90,'phase_id' => 23, 'name' => 'P-34 Tanda Terima Barang Bukti', 'duration' => 0, 'direction' => 'next', 'ordinal' => 48],

                //Persidangan
                ['id'=>91,'phase_id' => 24, 'name' => 'Ketetapan Hari Sidang', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 49],
                ['id'=>92,'phase_id' => 24, 'name' => 'Pembacaan Surat Dakwaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 50],
                ['id'=>93,'phase_id' => 24, 'name' => 'Pembacaan Eksepsi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 51],
                ['id'=>94,'phase_id' => 24, 'name' => 'Pembacaan Tanggapan Eksepsi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 52],
                ['id'=>95,'phase_id' => 24, 'name' => 'Putusan Sela', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 53],
                ['id'=>96,'phase_id' => 24, 'name' => 'Pemeriksaan Saksi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 54],
                ['id'=>97,'phase_id' => 24, 'name' => 'Pemeriksaan Terdakwa', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 55],
                ['id'=>98,'phase_id' => 24, 'name' => 'P-41 Rencana Tuntutan Pidana', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 56],
                ['id'=>99,'phase_id' => 24, 'name' => 'P-42 Surat Tuntutan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 57],
                ['id'=>100,'phase_id' => 24, 'name' => 'P-43 Laporan Tuntutan Pidana', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 58],
                ['id'=>101,'phase_id' => 24, 'name' => 'Pembacaan Pledoi/Pembelaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 59],
                ['id'=>102,'phase_id' => 24, 'name' => 'Pembacaan Tanggapan Pledoi/Pembelaan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 60],
                ['id'=>103,'phase_id' => 24, 'name' => 'Putusan', 'duration' => 0, 'direction' => 'next', 'ordinal' => 61],
                ['id'=>104,'phase_id' => 24, 'name' => 'P-44 Laporan Jaksa Penuntut Umum Segera Setelah Putusan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 62],
                ['id'=>105,'phase_id' => 24, 'name' => 'P-45 Laporan Putusan Pengadilan', 'duration' => 0, 'direction' => 'next', 'ordinal' => 63],

                // Upaya Hukum & Eksekusi
                ['id'=>106,'phase_id' => 25, 'name' => 'P-44 Laporan Jaksa Penuntut Umum Segera Setelah Putusan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 64],
                ['id'=>107,'phase_id' => 25, 'name' => 'P-45 Laporan Putusan Pengadilan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 65],
                ['id'=>108,'phase_id' => 25, 'name' => 'Banding', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 66],
                ['id'=>109,'phase_id' => 25, 'name' => 'Kasasi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 67],
                ['id'=>110,'phase_id' => 25, 'name' => 'Peninjauan Kembali (PK)', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 68],
                ['id'=>111,'phase_id' => 25, 'name' => 'Grasi', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 69],
                ['id'=>112,'phase_id' => 25, 'name' => 'P-48', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 70],
                ['id'=>113,'phase_id' => 25, 'name' => 'PIDSUS-38 Berita Acara Pelaksanaan Putusan Pengadilan', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 71],
                ['id'=>114,'phase_id' => 25, 'name' => 'P-28 Riwayat Perkara', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 72],
                ['id'=>115,'phase_id' => 25, 'name' => 'P-53', 'duration' => 0, 'direction' => 'stay', 'ordinal' => 73],
                ['id'=>116,'phase_id' => 25, 'name' => 'Pengarsipan', 'duration' => 0, 'direction' => 'finish', 'ordinal' => 74],


                //DATUN
                ['id'=>317,'phase_id' =>  31,'name' => 'Menerima dan meregister permohonan', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   1   ],
                ['id'=>318,'phase_id' =>  31,'name' => 'Meneruskan permohonan Pelayanan Hukum kepada JAM DATUN  ', 'duration' =>    1   , 'direction' => 'stay', 'ordinal' =>   2   ],
                ['id'=>319,'phase_id' =>  31,'name' => 'Meneruskan permohonan Pelayanan Hukum dan pemberian arahan kepada Direktur Perdata  ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   3   ],
                ['id'=>320,'phase_id' =>  31,'name' => 'Meneruskan permohonan Pelayanan Hukum dan pemberian arahan kepada Kasubdit Yankum Perdata   ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   4   ],
                ['id'=>321,'phase_id' =>  31,'name' => 'Membuat net konsep surat perintah telaah kepada Unit Pelaksana  ', 'duration' =>    1   , 'direction' => 'stay', 'ordinal' =>   5   ],
                ['id'=>322,'phase_id' =>  31,'name' => 'Menandatangani Surat Perintah telaah Permohonan Pelayanan Hukum ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   6   ],
                ['id'=>323,'phase_id' =>  31,'name' => 'Mengundang pihak Pemohon Permintaan Pelayanan Hukum jika diperlukan guna melengkapi data-data yang diperlukan Tim JPN (Unit Pelaksana) yang ditunjuk berdasarkan Surat Perintah untuk menelaah. ', 'duration' =>    10  , 'direction' => 'stay', 'ordinal' =>   7   ],
                ['id'=>324,'phase_id' =>  31,'name' => 'Membuat dan menyampaikan telaahan atas Permohonan Pelayanan  Hukum kepada JAM DATUN ', 'duration' =>    10  , 'direction' => 'stay', 'ordinal' =>   8   ],
                ['id'=>325,'phase_id' =>  31,'name' => 'Melaporkan telaahan kepada Jaksa Agung RI dengan Surat yang ditandatangani oleh JAM DATUN   ', 'duration' =>    3   , 'direction' => 'stay', 'ordinal' =>   9   ],
                ['id'=>326,'phase_id' =>  31,'name' => 'Memerintahkan Unit Pelaksana untuk melakukan pemaparan/ ekspose terhadap telaahan   ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   10  ],


                ['id'=>327,'phase_id' =>  32,'name' => 'Unit Pelaksana membuat draft telaahan sebagai penjelasan atas permasalahan hukum yang disampaikan  Pemohon  ', 'duration' =>    7   , 'direction' => 'stay', 'ordinal' =>   1   ],
                ['id'=>328,'phase_id' =>  32,'name' => 'Meneruskan permohonan Pelayanan Hukum kepada JAM DATUN  ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   2   ],
                ['id'=>329,'phase_id' =>  32,'name' => 'Meneruskan permohonan Pelayanan Hukum dan pemberian arahan kepada Direktur Perdata  ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   3   ],
                ['id'=>330,'phase_id' =>  32,'name' => 'Meneruskan permohonan Pelayanan Hukum dan pemberian arahan kepada Kasubdit Yankum Perdata   ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   4   ],
                ['id'=>331,'phase_id' =>  32,'name' => 'Membuat net konsep surat perintah telaah kepada Unit Pelaksana  ', 'duration' =>    1   , 'direction' => 'stay', 'ordinal' =>   5   ],
                ['id'=>332,'phase_id' =>  32,'name' => 'Menandatangani Surat Perintah telaah Permohonan Pelayanan Hukum ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   6   ],
                ['id'=>333,'phase_id' =>  32,'name' => 'Mengundang pihak Pemohon Permintaan Pelayanan Hukum jika diperlukan guna melengkapi data-data yang diperlukan Tim JPN (Unit Pelaksana) yang ditunjuk berdasarkan Surat Perintah untuk menelaah. ', 'duration' =>    10  , 'direction' => 'stay', 'ordinal' =>   7   ],
                ['id'=>334,'phase_id' =>  32,'name' => 'Membuat dan menyampaikan telaahan atas Permohonan Pelayanan  Hukum kepada JAM DATUN ', 'duration' =>    10  , 'direction' => 'stay', 'ordinal' =>   8   ],
                ['id'=>335,'phase_id' =>  32,'name' => 'Melaporkan telaahan kepada Jaksa Agung RI dengan Surat yang ditandatangani oleh JAM DATUN   ', 'duration' =>    3   , 'direction' => 'stay', 'ordinal' =>   9   ],
                ['id'=>336,'phase_id' =>  32,'name' => 'Memerintahkan Unit Pelaksana untuk melakukan pemaparan/ ekspose terhadap telaahan   ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   10  ],
                ['id'=>337,'phase_id' =>  32,'name' => 'Melaksanakan ekspose telaahan   ', 'duration' =>    3   , 'direction' => 'stay', 'ordinal' =>   11  ],
                ['id'=>338,'phase_id' =>  32,'name' => 'Memberi petunjuk terhadap hasil telaah  ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   12  ],
                ['id'=>339,'phase_id' =>  32,'name' => 'Memberikan petunjuk untuk menyiapkan net konsep Surat Kuasa ', 'duration' =>    1   , 'direction' => 'stay', 'ordinal' =>   13  ],
                ['id'=>340,'phase_id' =>  32,'name' => 'Membuat net konsep Surat Kuasa Substitusi oleh Staf TU Bankum Dit. PPH  ', 'duration' =>    0   , 'direction' => 'stay', 'ordinal' =>   14  ],
                ['id'=>341,'phase_id' =>  32,'name' => 'Memeriksa net konsep Surat Kuasa substitusi ', 'duration' =>    1   , 'direction' => 'stay', 'ordinal' =>   15  ],
                ['id'=>342,'phase_id' =>  32,'name' => 'Menandatangani Surat Kuasa Substitusi   ', 'duration' =>    1   , 'direction' => 'stay', 'ordinal' =>   32  ],
                ['id'=>343,'phase_id' =>  32,'name' => 'Penandatanganan Surat Kuasa Substitusi oleh JPN pada Unit Pelaksana yang ditunjuk   ', 'duration' =>    2   , 'direction' => 'stay', 'ordinal' =>   17  ],


                ['id'=>345,'phase_id' =>  33,'name' => 'Laporan akhir Pemberian Pelayanan Hukum Masyarakat  ', 'duration' =>    10  , 'direction' => 'stay', 'ordinal' =>   1   ],
                ['id'=>346,'phase_id' =>  33,'name' => 'Pemberkasan /penjilidan ', 'duration' =>    10  , 'direction' => 'stay', 'ordinal' =>   2   ],
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

        DB::table('posts')->truncate();

        return DB::insert(file_get_contents(base_path()."/database/seeds/posts.sql"));

    }
}

class SettingSeeder extends Seeder{

    public function run()
    {
        return DB::table('settings')->insert([
            ['key' => 'kajari_name', 'value' => 'HADI SUMARTONO, SH.'],
            ['key' => 'kajari_nip', 'value' => '195811171979011002'],
            ['key' => 'kajari_jabatan', 'value' => 'Jaksa Utama Pratama'],
            ['key' => 'kepala_kejaksaan_provinsi', 'value' => 'Jawa Timur'],
            ['key' => 'kepala_kepolisian', 'value' => 'Jember']
        ]);
    }
}
