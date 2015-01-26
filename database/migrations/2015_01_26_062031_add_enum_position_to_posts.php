<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddEnumPositionToPosts extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        DB::statement("ALTER TABLE posts CHANGE COLUMN position position ENUM('pembinaan', 'intelijen', '201', '202')");
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        DB::statement("ALTER TABLE posts CHANGE COLUMN position position ENUM('main','manual','pembinaan','intelijen')");
	}

}
