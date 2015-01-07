<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\BufferedOutput;

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
		$this->info('core migration...');
		Artisan::call('migrate', []);

		$this->info('package migration...');
//		Artisan::call('migrate', ['--path' => 'vendor/eendonesia/gapura/src/migrations']);
//		Artisan::call('migrate', ['--path' => 'vendor/eendonesia/moderator/src/migrations']);
//		Artisan::call('migrate', ['--path' => 'vendor/eendonesia/skrip/src/migrations']);
//		Artisan::call('migrate', ['--path' => 'vendor/eendonesia/wilayah/src/migrations']);

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
