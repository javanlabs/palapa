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
            $table->unsignedInteger('ticker_id')->nullable();
            $table->unsignedInteger('duration')->nullable();
            $table->enum('direction', ['stay', 'prev', 'next', 'finish', 'suspend']);
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
