<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableOfficers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('officers', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('nip');
            $table->unsignedInteger('pangkat_id');
            $table->unsignedInteger('jabatan_id');
            $table->enum('role', ['staff', 'jaksa']);
            $table->timestamps();
            $table->softDeletes();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('officers', function(Blueprint $table) {
            $table->drop();
        });
	}

}
