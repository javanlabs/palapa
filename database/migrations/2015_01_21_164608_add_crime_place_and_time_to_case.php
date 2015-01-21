<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCrimePlaceAndTimeToCase extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('cases', function(Blueprint $table)
		{
            $table->text('crime_place')->nullable()->after('kasus');
			$table->dateTime('crime_time')->nullable()->after('crime_place');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('cases', function(Blueprint $table)
		{
			$table->dropColumn(['crime_place', 'crime_time']);
		});
	}

}
