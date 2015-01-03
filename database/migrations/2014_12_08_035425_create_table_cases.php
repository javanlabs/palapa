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
            
            $table->text('pasal');
            $table->text('kasus');
            $table->date('start_date');
            $table->date('finish_date')->nullable();;
            $table->unsignedInteger('type_id')->default(201);
            $table->unsignedInteger('phase_id');            
            $table->unsignedInteger('penyidik_id');

            $table->unsignedInteger('author_id');
            $table->unsignedInteger('jaksa_id');
            $table->unsignedInteger('staff_id');

            $table->enum('status', ['draft', 'on going', 'finish', 'suspended']);

            $table->string('spdp_number');
            $table->string('tgl_spdp');

            $table->date('tgl_persidangan');

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
