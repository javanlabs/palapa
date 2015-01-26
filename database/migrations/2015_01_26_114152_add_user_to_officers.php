<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserToOfficers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('officers', function(Blueprint $table)
		{
			$table->unsignedInteger('user_id')->nullable()->after('jabatan_id');
            $table->unique('user_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('officers', function(Blueprint $table)
		{
            $table->dropColumn('user_id');
		});
	}

}
