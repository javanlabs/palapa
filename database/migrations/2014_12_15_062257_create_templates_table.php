<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTemplatesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('templates', function(Blueprint $table)
		{	
            $table->increments('id');         
            $table->unsignedInteger('checklist_id');
            $table->string('title');            
            $table->text('content');            
            $table->timestamps();
            $table->softDeletes();
            $table->engine = 'MyISAM';       	
		});
		DB::statetemen("ALTER TABLE `templates` ADD `checklist_id` INT NOT NULL AFTER `id`;");
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('templates', function(Blueprint $table) {
            $table->drop();
        });
	}

}
