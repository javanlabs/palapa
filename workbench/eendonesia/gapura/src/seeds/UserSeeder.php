<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserSeeder {

    public function run()
    {
        $user = [
            'name'  => 'Admin',
            'email'  => 'admin@palapa.dev',
            'password'  => Hash::make('admin')
        ];
        return DB::table('users')->insert($user);
    }
}
