<?php namespace App\FileManager;

use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\File;

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

    public function getInfo($file)
    {
        $filePath = $this->filePath($file);

        $fileCount = null;
        if(File::isFile($filePath))
        {
            $sizeInByte = File::size($filePath);
            $fileCount = 1;
        }
        else
        {
            $folderInfo = $this->folderInfo($filePath);
            $sizeInByte = $folderInfo[0];
            $fileCount = $folderInfo[1];
        }

        return [
            'name'  => File::name($file),
            'size'  => $sizeInByte,
            'size_for_human'    => $this->filesizeForHuman($sizeInByte),
            'mime'  => File::type($filePath),
            'extension'  => File::extension($filePath),
            'is_file' => File::isFile($filePath),
            'is_directory' => File::isDirectory($filePath),
            'is_image'  => in_array(File::extension($filePath), ['jpg', 'png', 'gif']),
            'is_video'  => in_array(File::extension($filePath), ['mp4']),
            'file_count'    => $fileCount,
            'permalink' => route('backend.files.index', ['path' => $file]),
            'id'        => Crypt::encrypt($filePath)
        ];
    }

    public function delete($id)
    {
        $path = Crypt::decrypt($id);
        return unlink($path);
    }

    public function filePath($path)
    {
        return $this->baseDirectory . DIRECTORY_SEPARATOR . $path;
    }

    protected function filesizeForHuman($bytes, $decimals = 0)
    {
        $size = array('B','KB','MB','GB','TB','PB','EB','ZB','YB');
        $factor = floor((strlen($bytes) - 1) / 3);
        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . ' ' . @$size[$factor];
    }

    protected function folderInfo($dir){
        $count_size = 0;
        $count = 0;
        $dir_array = scandir($dir);
        foreach($dir_array as $key=>$filename){
            if($filename!=".." && $filename!="."){
                if(is_dir($dir."/".$filename)){
                    $new_foldersize = $this->folderInfo($dir."/".$filename);
                    $count_size = $count_size + $new_foldersize[0];
                    $count = $count + $new_foldersize[1];
                }else if(is_file($dir."/".$filename)){
                    $count_size = $count_size + filesize($dir."/".$filename);
                    $count++;
                }
            }

        }

        return array($count_size,$count);
    }
}