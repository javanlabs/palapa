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
			$table->enum('sex', ['Laki-laki', 'Perempuan']);	

			$table->string('name');
            $table->string('pob');
            $table->string('dob');
            $table->tinyInteger('age')->nullable();
            $table->string('religion');
            $table->string('address');
            $table->string('city_id');
            $table->string('nationality');
            $table->string('job');
            $table->string('education');
            $table->string('nama_pimpinan');

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
