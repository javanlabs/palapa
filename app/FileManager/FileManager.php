<?php namespace App\FileManager;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\Config;

class FileManager
{

    /**
     * @var Filesystem
     */
    private $filesystem;

    private $baseDirectory;

    function __construct(Filesystem $filesystem)
    {
        $this->filesystem = $filesystem;
        $this->baseDirectory = Config::get('filesystems.disks.local.root');
    }

    public function all($path)
    {
        $directories = $this->filesystem->directories($path);
        $files = $this->filesystem->files($path);

        $items = [];
        foreach($directories as $item)
        {
            $items[] = $this->getInfo($item);
        }

        foreach($files as $item)
        {
            $items[] = $this->getInfo($item);
        }

        return $items;
    }

    public function getInfo($file, $readable = false)
    {
        $filePath = $this->filePath($file);

        return [
            'name'  => $file,
            'size'  => '',
            'size_for_human'    => '',
            'mime'  => '',
            'permalink' => route('backend.files.show', [$file])
        ];
    }

    protected function filePath($path)
    {
        return $this->baseDirectory . DIRECTORY_SEPARATOR . $path;
    }
}