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
            $table->unsignedInteger('type_id');
            $table->unsignedInteger('author_id');
            $table->unsignedInteger('checklist_id');
            $table->string('title');            
            $table->text('content');
            $table->timestamps();
            $table->softDeletes();
            $table->engine = 'MyISAM';       	
		});
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
