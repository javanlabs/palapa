<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeCasesCategory extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
    public function up()
    {
        DB::statement("ALTER TABLE cases CHANGE COLUMN category position ENUM(
          'tpul',
          'orharga',
          'kamtibum',
          'perkara-anak-diversi',
          'perkara-anak-korban',
          'perkara-anak-korban',
          'perkara-anak-pra-penuntutan',
          'korupsi',
          'bankum',
          'timkum',
          'yankum',
          'thl'
        )");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE cases CHANGE COLUMN category position ENUM('main','manual','pembinaan','intelijen')");
    }

}
