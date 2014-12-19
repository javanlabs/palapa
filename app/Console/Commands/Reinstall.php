<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Database\Schema\Blueprint;
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

		foreach($tables as $table)
		{
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
