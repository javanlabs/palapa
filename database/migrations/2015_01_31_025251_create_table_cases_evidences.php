<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCasesEvidences extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('cases_evidences', function(Blueprint $table)
        {
            $table->increments('id');
            $table->unsignedInteger('case_id');
            $table->text('name');
            $table->timestamps();
            $table->index(['cases_id']);
        });
	}

	/**
	 * Reverse the migrations.
	 *he	 * @return void
	 */
	public function down()
	{
        Schema::table('cases_evidences', function(Blueprint $table)
        {
            $table->drop();
        });
	}

}
