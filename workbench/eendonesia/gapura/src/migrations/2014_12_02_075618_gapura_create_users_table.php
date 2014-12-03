<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GapuraCreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('email');
			$table->string('password', 60);
			$table->string('name', 255);
			$table->string('status', 40);
			$table->rememberToken();
            $table->string('activation_code')->nullable();
            $table->timestamp('last_activity')->nullable();
			$table->timestamps();
            $table->softDeletes();

            $table->unique('email');
            $table->index('status');
            $table->index('activation_code');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
