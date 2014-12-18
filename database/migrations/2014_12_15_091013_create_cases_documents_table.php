<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCasesDocumentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('cases_documents', function(Blueprint $table)
		{
			$table->increments('id');
			$table->unsignedInteger('case_id');
			$table->unsignedInteger('template_id');
			$table->string('title');
            $table->text('content');
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
		Schema::table('cases_documents', function(Blueprint $table) {
            $table->drop();
        });

	}

}
