<?php

function case_deadline($day)
{
    if($day >= 0)
    {
        if($day == 0)
        {
            return '<span class="label label-warning">hari ini</span>';
        }
        elseif($day == 1)
        {
            return '<span class="label label-warning">hari ini</span>';
        }
        else
        {
            return '<span class="label label-success">' . $day . " hari lagi" . '</span>';
        }
    }
    else
    {
        return '<span class="label label-danger">' . "lewat " . abs($day) . " hari" . '</span>';
    }

}

function random_wallpaper()
{
    $defaultDirectory = public_path('images/wallpaper');
    $userDirectory = public_path('upload/wallpaper');

    $defaultWallpapers = \Illuminate\Support\Facades\File::allFiles($defaultDirectory);
    $userWallpapers = \Illuminate\Support\Facades\File::allFiles($userDirectory);

    if(rand(0, 1) == 1 && !empty($userWallpapers))
    {
        return asset('upload/wallpaper/' . $userWallpapers[rand(0, count($userWallpapers) - 1)]->getFilename());
    }

    return asset('images/wallpaper/' . $defaultWallpapers[rand(0, count($defaultWallpapers) - 1)]->getFilename());
}