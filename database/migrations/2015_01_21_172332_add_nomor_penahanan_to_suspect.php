<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNomorPenahananToSuspect extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('suspects', function(Blueprint $table)
		{
			$table->string('nomor_penahanan')->nullable()->after('tgl_penahanan');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('suspects', function(Blueprint $table)
		{
			$table->dropColumn('nomor_penahanan');
		});
	}

}
