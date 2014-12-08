<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCases extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('cases', function(Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('spdp_number');
            $table->text('pasal');
            $table->text('kasus');
            $table->date('date');
            $table->enum('phase', ['spdp', 'tahap-1', 'tahap-2', 'penuntutan', 'persidangan', 'selesai']);

            $table->string('suspect_name');
            $table->string('suspect_pob');
            $table->string('suspect_dob');
            $table->string('suspect_religion');
            $table->string('suspect_address');
            $table->string('suspect_city_id');

            $table->unsignedInteger('author_id');
            $table->unsignedInteger('jaksa_id');
            $table->unsignedInteger('staff_id');

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
        Schema::table('cases', function(Blueprint $table) {
            $table->drop();
        });
	}

}
