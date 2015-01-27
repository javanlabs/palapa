<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCasesCourts extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cases_courts', function(Blueprint $table)
		{
			$table->increments('id');
			$table->unsignedInteger('case_id');
            $table->text('agenda');
            $table->date('date');
            $table->unsignedInteger('created_by');
            $table->unsignedInteger('updated_by');
            $table->timestamps();

            $table->index('case_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('cases_courts', function(Blueprint $table)
		{
			$table->drop();
		});
	}

}
