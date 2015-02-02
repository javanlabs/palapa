<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableTemplatesAddOrientation extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('templates', function(Blueprint $table)
        {
            $table->enum('orientation', ['portrait', 'landscape'])->default('portrait')->after('title');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('templates', function(Blueprint $table)
        {
            $table->dropColumn('orientation');
        });

	}

}
