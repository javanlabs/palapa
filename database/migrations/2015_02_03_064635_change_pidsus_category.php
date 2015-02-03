<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangePidsusCategory extends Migration {

    public function up()
    {
        DB::statement("ALTER TABLE cases CHANGE COLUMN category category ENUM(
          'tpul',
          'orharga',
          'kamtibum',
          'perkara-anak-diversi',
          'perkara-anak-korban',
          'perkara-anak-korban',
          'perkara-anak-pra-penuntutan',
          'korupsi',
          'ham',
          'pajak',
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
        DB::statement("ALTER TABLE cases CHANGE COLUMN category category ENUM(
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

}
