<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;

class Reinstall extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'app:reinstall';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Command description.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		$db = DB::connection()->getDatabaseName();
		$tables = DB::select(DB::raw("select * from information_schema.tables where table_schema = '$db'"));

        if(App::environment() == 'production')
        {
            $dataTables = array(
                'cases',
                'cases_activities',
                'cases_checklist',
                'cases_courts',
                'cases_documents',
                'cases_evidences',
                'cases_officers',
                'cases_phases_history',
                'cases_suspects',
                'cases_witness',
                'officers',
                'posts',
                'settings',
                'suspects',
                'users',
                'witness',
            );
        }
        else
        {
            $dataTables = [];
        }

		foreach($tables as $table)
		{
			if(!in_array($table->TABLE_NAME, $dataTables)){
				if($table->TABLE_TYPE == 'BASE TABLE')
				{
					DB::statement('DROP TABLE ' . $table->TABLE_NAME);
					$this->info('Drop table ' . $table->TABLE_NAME);
				}
				else
				{
					DB::statement('DROP VIEW ' . $table->TABLE_NAME);
					$this->info('Drop view ' . $table->TABLE_NAME);
				}
			}
			else{
				$this->info("Skipping data table : ". $table->TABLE_NAME);
			}
		}

		$this->info('Run app:install, please be patient....');
		Artisan::call('app:install');
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return [

		];
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return [

		];
	}

}
