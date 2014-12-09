<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCasesChecklist extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('cases_checklist', function(Blueprint $table) {
            $table->unsignedInteger('case_id');
            $table->unsignedInteger('checklist_id');
            $table->date('date');
            $table->text('note');
            $table->primary(['case_id', 'checklist_id']);
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('cases_checklist', function(Blueprint $table) {
            $table->drop();
        });
	}

}
