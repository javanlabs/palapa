<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePhase extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('sop_phase', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->unsignedInteger('ordinal');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('sop_phase', function(Blueprint $table) {
            $table->drop();
        });
	}

}
