<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBerkasFieldsToCases extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('cases', function(Blueprint $table)
        {
            $table->string('berkas_number')->nullable();
            $table->date('berkas_date')->nullable();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('cases', function(Blueprint $table)
        {
            $table->dropColumn(['berkas_number', 'berkas_date']);
        });
	}

}
