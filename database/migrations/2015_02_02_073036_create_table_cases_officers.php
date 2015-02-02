<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCasesOfficers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cases_officers', function(Blueprint $table)
		{
            $table->unsignedInteger('case_id');
            $table->unsignedInteger('officer_id');

            $table->primary(['case_id', 'officer_id']);
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('cases_officers', function(Blueprint $table)
		{
			$table->drop();
		});
	}

}
