<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTablePosts extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
    public function up()
    {
        Schema::create('posts', function(Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('author_id');
            $table->string('title');
            $table->text('content');
            $table->enum('status', array('published','draft'));
            $table->enum('position', array('main','manual', 'pembinaan', 'intelijen'));
            $table->timestamps();
            $table->softDeletes();
            $table->engine = 'MyISAM';
        });
        DB::statement('ALTER TABLE posts ADD FULLTEXT search(title, content)');
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('posts', function(Blueprint $table) {
            $table->dropIndex('search');
            $table->drop();
        });
    }

}
