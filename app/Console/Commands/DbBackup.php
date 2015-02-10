<?php namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\File;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Output\BufferedOutput;
use App;

class DbBackup extends Command {

    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'app:db-backup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backup database.';

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
        $host = getenv('DB_HOST');
        $port = getenv('DB_PORT');
        $username = getenv('DB_USERNAME');
        $password = getenv('DB_PASSWORD');
        $database = getenv('DB_DATABASE');
        $targetDir = storage_path('db/');
        $targetFile = $targetDir . Carbon::now()->format('YmdHis') . '.sql';

        // jaga-jaga saja
        if(!File::isDirectory($targetDir))
        {
            File::makeDirectory($targetDir);
        }

        $shellProcessor = new \McCool\DatabaseBackup\Processors\ShellProcessor(new \Symfony\Component\Process\Process(''));
        $dumper   = new \McCool\DatabaseBackup\Dumpers\MysqlDumper($shellProcessor, $host, $port, $username, $password, $database, $targetFile);
        $archiver = new \McCool\DatabaseBackup\Archivers\GzipArchiver($shellProcessor);

        $backup = new \McCool\DatabaseBackup\BackupProcedure($dumper);
        $backup->setArchiver($archiver);

        $backup->backup();

        $this->line('Backup file successfully generated');
        $this->info($targetFile);
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
