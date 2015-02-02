<?php

use Illuminate\Database\Migrations\Migration;

class CreateViewCasesCurrentTimeline extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        DB::statement('
            CREATE VIEW `v_cases_current_timeline`
            AS SELECT
            cases.id, cases.phase_id, cph.start_date, datediff(CURDATE(), cph.`start_date`)  current_duration, sp.duration standard_duration from cases inner join cases_phases_history cph on (cases.id = cph.case_id and cph.phase_id = cases.phase_id and cph.finish_date is null)
            inner join sop_phase sp on (sp.id = cases.phase_id)
		');
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        DB::statement('DROP VIEW `v_cases_current_timeline`');
	}

}
