<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeedTemplateSuratPidsus extends Migration {

    protected $data = [
        [
            'short_title'  => 'P-16',
            'title'        => 'Surat Perintah Penunjukan JPU untuk mengikuti Perkembangan Penyidikan perkara tindak pidana',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-17',
            'title'        => 'Permintaan Perkembangan Hasil Penyidikan',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-18',
            'title'        => 'Hasil Penyidikan Belum Lengkap',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-19',
            'title'        => 'Pengembalian Berkas Perkara untuk dilengkapi',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-20',
            'title'        => 'Pemberitahuan Bahwa waktu penyidikan Tambahan Sudah Habis',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-21',
            'title'        => 'Pemberitahuan Hasil Penyidikan Sudah Lengkap',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-21A',
            'title'        => 'Pemberitahuan Susulan Hasil Penyidikan Sudah Lengkap',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-16A',
            'title'        => 'Surat Perintah Penunjukan JPU untuk Penyelesaian Perkara Tindak Pidana',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-31',
            'title'        => 'Surat Pelimpahan Perkara Acara Pemeriksaan Biasa (APB)',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-44',
            'title'        => 'Laporan JPU Segera Setelah Putusan',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-45',
            'title'        => 'Laporan Putusan Pengadilan',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-48',
            'title'        => 'Surat Perintah Pelaksanaan Putusan Pengadilan',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'P-53',
            'title'        => 'Kartu Perkara Tindak Pidana',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'BA-8',
            'title'        => 'Berita Acara Pelaksanaan Putusan Pengadilan',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'BA-10',
            'title'        => 'Berita Acara Perintah Pelaksanaan Perintah Penahanan - Penahanan Lanjutan',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'BA-15',
            'title'        => 'Berita Acara Penerimaan dan Penelitian Tersangka',
            'case_type_id' => 202
        ],
        [
            'short_title'  => 'BA-18',
            'title'        => 'Berita Acara Penerimaan dan Penelitian Benda Sitaan - Barang Bukti',
            'case_type_id' => 202
        ]
    ];
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		return DB::table('templates')->insert($this->data);
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        foreach($this->data as $template)
        {
            DB::table('templates')
                ->where('short_title', '=', $template['short_title'])
                ->where('case_type_id', '=', $template['case_type_id'])
                ->delete();
        }
	}

}
