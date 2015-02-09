<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SoftDeleteCaseRelatedData extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('cases_courts', function($table) {$table->softDeletes();});
        Schema::table('cases_documents', function($table) {$table->softDeletes();});
        Schema::table('cases_evidences', function($table) {$table->softDeletes();});
        Schema::table('suspects', function($table) {$table->softDeletes();});
        Schema::table('witness', function($table) {$table->softDeletes();});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('cases_courts', function($table) {$table->dropSoftDeletes();});
        Schema::table('cases_documents', function($table) {$table->dropSoftDeletes();});
        Schema::table('cases_evidences', function($table) {$table->dropSoftDeletes();});
        Schema::table('suspects', function($table) {$table->dropSoftDeletes();});
        Schema::table('witness', function($table) {$table->dropSoftDeletes();});
	}

}
