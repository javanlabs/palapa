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
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->string('subject_type');
            $table->string('predicate')->nullable();
            $table->unsignedBigInteger('object_id')->nullable();
            $table->string('object_type')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();

            $table->index(['subject_id', 'subject_type']);
            $table->index('predicate');
            $table->index(['object_id', 'object_type']);
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
