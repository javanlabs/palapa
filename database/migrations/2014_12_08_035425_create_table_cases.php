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
            $table->date('finish_date')->nullable();
            $table->unsignedInteger('type_id')->default(201);
            $table->unsignedInteger('phase_id');            
            $table->unsignedInteger('penyidik_id')->nullable();

            $table->unsignedInteger('author_id');
            $table->unsignedInteger('jaksa_id')->nullable();
            $table->unsignedInteger('staff_id')->nullable();

            $table->enum('status', ['draft', 'ongoing', 'finish', 'suspend'])->default('draft');

            $table->string('spdp_number')->nullable();
            $table->date('tgl_spdp')->nullable();

            $table->date('tgl_persidangan')->nullable();

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
