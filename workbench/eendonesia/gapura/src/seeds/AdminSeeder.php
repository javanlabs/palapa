<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * Class DbSeeder
 *
 * @author jacopo beschi jacopo@jacopobeschi.com
 */
class AdminSeeder extends Seeder
{
    public function run()
    {
        Eloquent::unguard();

        $user = [
            'name'  => 'Root',
            'email'  => 'root@palapa.dev',
            'password'  => Hash::make('root')
        ];
        return DB::table('users')->insert($user);


        Eloquent::reguard();
    }
}
