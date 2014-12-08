<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableLookups extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('lookups', function(Blueprint $table) {
            $table->increments('id');
            $table->string('type');
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();

            $table->index('type');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('lookups', function(Blueprint $table) {
            $table->drop();
        });
	}

}
