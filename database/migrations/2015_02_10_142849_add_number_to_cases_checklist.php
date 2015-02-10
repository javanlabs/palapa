<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNumberToCasesChecklist extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('cases_checklist', function(Blueprint $table)
		{
			$table->string('number')->nullable()->after('date');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('cases_checklist', function(Blueprint $table)
		{
			$table->dropColumn('number');
		});
	}

}
