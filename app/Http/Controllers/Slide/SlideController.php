<?php namespace App\Http\Controllers\Slide;

use App\Cases\Court\Court;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SlideController extends Controller {

    public function index()
    {
        return redirect()->route('slide.image');
    }

    public function image()
    {
        $images = [];
        foreach(File::allFiles(base_path('public/upload/slide/images')) as $file)
        {
            $info = getimagesize($file);
            $images[] = ['name' => $file->getFilename(), 'src' => asset('upload/slide/images/' . $file->getFilename()), 'w'=>$info[0], 'h' => $info[1]];
        }

        usort($images, function($a, $b){
            return $a['name'] > $b['name'];
        });

        return view('slide.image', compact('images'));
    }

    public function scroll()
    {
        $images = [];
        foreach(File::allFiles(base_path('public/upload/slide/scroll')) as $file)
        {
            $info = getimagesize($file);
            $images[] = ['name' => $file->getFilename(), 'url' => asset('upload/slide/scroll/' . $file->getFilename()), 'width'=>$info[0], 'height' => $info[1]];
        }

        usort($images, function($a, $b){
            return $a['name'] > $b['name'];
        });

        return view('slide.scroll', compact('images'));
    }

    public function video()
    {
        $videos = [];
        foreach(File::allFiles(base_path('public/upload/slide/videos')) as $file)
        {
            $videos[] = ['src' => [asset('upload/slide/videos/' . $file->getFilename())]];
        }

        if(empty($videos))
        {
            return redirect()->route('slide.image');
        }
        natsort($videos);
        return view('slide.video', compact('videos'));
    }

    public function sidang()
    {
        $courts = Court::with('cases')->upcoming()->get();

        return view('slide.sidang', compact('courts'));
    }

}
