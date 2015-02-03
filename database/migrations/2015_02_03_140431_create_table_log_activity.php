<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableLogActivity extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('log_activities', function(Blueprint $table)
		{
			$table->bigIncrements('id');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('subject')->nullable();
            $table->string('predicate')->nullable();
            $table->string('object')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();

            $table->index('subject');
            $table->index('predicate');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('log_activities', function(Blueprint $table)
		{
			$table->drop();
		});
	}

}
