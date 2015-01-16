<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableSuspects extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('suspects', function(Blueprint $table)
		{
			$table->increments('id');
			$table->enum('type', ['individu', 'badan']);
			$table->enum('status', ['tergugat', 'penggugat', 'pelapor']);
			$table->enum('sex', ['Laki-laki', 'Perempuan'])->nullable();

			$table->string('name');
            $table->string('pob_id');
            $table->string('dob')->nullable();
            $table->tinyInteger('age')->nullable();
            $table->string('religion')->nullable();
            $table->string('address')->nullable();
            $table->string('city_id')->nullable();
            $table->string('nationality')->nullable();
            $table->string('job')->nullable();
            $table->string('education')->nullable();
            $table->string('nama_pimpinan')->nullable();

            $table->enum('tahanan', ['Belum Ditahan', 'RUTAN', 'Rumah', 'Kota']);
            $table->date('tgl_penahanan')->nullable();

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
		Schema::drop('suspects');
	}

}
