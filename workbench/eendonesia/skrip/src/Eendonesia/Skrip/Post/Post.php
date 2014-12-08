<?php namespace Eendonesia\Skrip\Post;

use Illuminate\Database\Eloquent\Model;

class Post extends Model {

    protected $table = 'posts';

    protected $fillable = ['title', 'content'];

    public function author()
    {
        return $this->belongsTo('App\User', 'author_id');
    }

}
