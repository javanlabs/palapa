<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCasesHistory extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('cases_phases_history', function(Blueprint $table) {
            $table->unsignedInteger('case_id');
            $table->unsignedInteger('phase_id');
            $table->date('start_date');
            $table->date('finish_date')->nullable();
            $table->primary(['case_id', 'phase_id']);
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('cases_phases_history', function(Blueprint $table) {
            $table->drop();
        });
	}

}
