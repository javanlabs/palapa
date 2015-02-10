<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDatunToPosts extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        DB::statement("ALTER TABLE posts CHANGE COLUMN position position ENUM('pembinaan', 'intelijen', '201', '202', '203')");
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        DB::statement("ALTER TABLE posts CHANGE COLUMN position position ENUM('pembinaan', 'intelijen', '201', '202')");
	}

}
