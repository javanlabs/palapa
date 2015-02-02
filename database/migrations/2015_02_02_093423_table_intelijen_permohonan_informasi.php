<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TableIntelijenPermohonanInformasi extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('intelijen_permohonan_informasi', function(Blueprint $table)
		{
			$table->increments('id');
			$table->date('tanggal_terima');
			$table->string('nama_pemohon');
			$table->text('alamat_pemohon');
			$table->enum('status',['lengkap', 'tidak lengkap']);
			$table->text('keterangan');
			$table->date('tanggal_pengembalian');
			$table->string('klarifikasi_surat');
			$table->string('klarifikasi_telepon');
			$table->date('tanggal_dokumen_lengkap');
			$table->string('no_register');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
