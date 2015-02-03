<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterPhaseHistoryStartDateNullable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        DB::statement("ALTER TABLE cases_phases_history CHANGE start_date start_date DATE  NULL");

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        DB::statement("ALTER TABLE cases_phases_history CHANGE start_date start_date DATE NOT NULL");
	}

}
