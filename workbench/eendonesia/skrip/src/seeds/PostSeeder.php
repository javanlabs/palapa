<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Facades\DB;
use Faker\Factory;
use Carbon\Carbon;

/**
 * Class DbSeeder
 *
 * @author jacopo beschi jacopo@jacopobeschi.com
 */
class PostSeeder extends Seeder
{
    public function run()
    {
        Eloquent::unguard();

        $now = Carbon::now()->toDateTimeString();
        $faker = Factory::create();
        $posts = [];
        foreach(range(1,20) as $item)
        {
            $posts[] = [
                'title' => $faker->sentence,
                'content' => $faker->paragraph(50),
                'creator_id'    => 1,
                'created_at'    => $now,
                'updated_at'    => $now,
            ];
        }

        return DB::table('posts')->insert($posts);

        Eloquent::reguard();
    }
}
