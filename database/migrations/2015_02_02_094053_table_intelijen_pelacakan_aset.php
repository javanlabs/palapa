<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TableIntelijenPelacakanAset extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('intelijen_pelacakan_aset', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('no');
			$table->date('tanggal');
			$table->unsignedInteger('officer_id');			
			$table->text('hasil');
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
