<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCategoryToCase extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('cases', function(Blueprint $table)
		{
            $table->enum('category', ['tpul', 'oharda', 'kamtibum'])->nullable()->after('type_id');
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
			$table->dropColumn('category');
		});
	}

}
