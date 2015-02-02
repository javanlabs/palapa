
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TableIntelijenPerintahOperasiIntelijen extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('intelijen_perintah_operasi', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('no');
			$table->date('tanggal');
			$table->text('perintah');
			$table->date('tanggal_diterima');
			$table->text('hasil');
			$table->date('tanggal_laporan');
			$table->text('keterangan');

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
