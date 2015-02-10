<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\BufferedOutput;
use DB;
use App;

class Install extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'app:install';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Run migration + seed initial data.';

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
        if(App::environment() == 'production')
        {
            $db = DB::connection()->getDatabaseName();
            $tables = DB::select(DB::raw("select * from information_schema.tables where table_schema = '$db'"));

            if(!empty($tables))
            {
                $this->error('Application in production mode and database not empty, command halted.');
                return false;
            }
        }


		$this->info('core migration...');
		Artisan::call('migrate', []);

		$this->info('Database seeder...');
		Artisan::call('db:seed', []);

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
