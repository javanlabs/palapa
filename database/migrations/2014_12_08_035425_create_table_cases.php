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
            $table->string('spdp_number');
            $table->text('pasal');
            $table->text('kasus');
            $table->date('start_date');
            $table->date('finish_date')->nullable();;
            $table->unsignedInteger('type_id')->default(201);
            $table->unsignedInteger('phase_id')->default(1);

            $table->string('suspect_name');
            $table->string('suspect_pob');
            $table->string('suspect_dob');
            $table->string('suspect_religion');
            $table->string('suspect_address');
            $table->string('suspect_city_id');
            $table->string('suspect_nationality');
            $table->string('suspect_job');
            $table->string('suspect_education');
            $table->string('penyidik');

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
