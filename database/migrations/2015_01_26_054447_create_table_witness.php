<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableWitness extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('witness', function(Blueprint $table)
		{
            $table->increments('id');
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
		Schema::table('witness', function(Blueprint $table)
		{
			$table->drop();
		});
	}

}
