<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ActivitiesBelongsToCases extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('log_activities', function($table) {
            $table->unsignedInteger('case_id')->after('id');
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
        Schema::table('log_activities', function($table) {
            $table->dropColumn('case_id');
        });
	}

}
