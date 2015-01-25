<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCasesWitness extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cases_witness', function(Blueprint $table)
		{
            $table->unsignedInteger('cases_id');
            $table->unsignedInteger('witness_id');
            $table->primary(['cases_id', 'witness_id']);
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('cases_witness', function(Blueprint $table)
		{
			$table->drop();
		});
	}

}
