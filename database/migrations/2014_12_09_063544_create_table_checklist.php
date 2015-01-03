<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableChecklist extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('sop_checklist', function(Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('phase_id');            
            $table->string('name');
            $table->unsignedInteger('ticker_id');
            $table->unsignedInteger('duration');
            $table->enum('direction', ['stay', 'prev', 'next', 'stop']);
            $table->unsignedInteger('ordinal');

            $table->string('related_data');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('sop_checklist', function(Blueprint $table) {
            $table->drop();
        });
	}

}
