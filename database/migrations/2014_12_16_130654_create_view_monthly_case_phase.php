<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateViewMonthlyCasePhase extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		DB::statement('
            CREATE VIEW `v_monthly_case_phase`
            AS SELECT
            `cases_phases_history`.`case_id` AS `case_id`,max(`cases_phases_history`.`phase_id`) AS `phase_id`,month(`cases_phases_history`.`start_date`) AS `month`,year(`cases_phases_history`.`start_date`) AS `year`
            FROM `cases_phases_history`
            JOIN cases ON (case_id = cases.`id`)
            where cases.deleted_at is null
            group by `cases_phases_history`.`case_id`,month(`cases_phases_history`.`start_date`),year(`cases_phases_history`.`start_date`)
		');
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		DB::statement('DROP VIEW `v_monthly_case_phase`');
	}

}
