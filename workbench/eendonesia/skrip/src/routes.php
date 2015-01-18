<?php

Route::group(['namespace' => 'Eendonesia\Skrip\Controllers', 'prefix' => Config::get('skrip::prefix')], function()
{
    Route::group(['middleware' => ['auth']], function()
    {
        Route::resource('posts', 'PostsController');        
    });

    Route::post("uploadImage", function(){
        	// files storage folder
			$dir = public_path().'/upload/images/';
			if(!is_dir($dir)){
				mkdir($dir,0777,true);
			}
			 
			$_FILES['file']['type'] = strtolower($_FILES['file']['type']);
			 
			if ($_FILES['file']['type'] == 'image/png'
			|| $_FILES['file']['type'] == 'image/jpg'
			|| $_FILES['file']['type'] == 'image/gif'
			|| $_FILES['file']['type'] == 'image/jpeg'
			|| $_FILES['file']['type'] == 'image/pjpeg')
			{
			    // setting file's mysterious name
			    $filename = md5(date('YmdHis')).'.jpg';
			    $file = $dir.$filename;
			 
			    // copying
			    move_uploaded_file($_FILES['file']['tmp_name'], $file);
			 
			    // displaying file
			    $array = array(
			        'filelink' => '/upload/images/'.$filename
			    );
			 
			    echo stripslashes(json_encode($array));
			 
			}
        });
});
