<?php namespace App\Menu;


use Illuminate\Support\Collection;
use Auth;

class EloquentRepository implements RepositoryInterface {

    public function all()
    {
        $menu = [
            ['title' => 'Cari Kasus', 'url' => route('frontend.search'), 'keymap' => 1],
            ['title' => 'Daftar Jaksa', 'url' => route('frontend.officer'), 'keymap' => 2],
            ['title' => 'Struktur Organisasi', 'url' => '', 'keymap' => 5],
            ['title' => 'Alur Kasus', 'url' => '', 'keymap' => 8],
            ['title' => 'Jadwal Operasional', 'url' => '', 'keymap' => 3],
            ['title' => 'Pengaduan', 'url' => '', 'keymap' => 6],
            ['title' => 'Buku Tamu', 'url' => '', 'keymap' => 9],
            ['title' => 'Galeri', 'url' => '', 'keymap' => 4],
            ['title' => 'Kode Etik', 'url' => '', 'keymap' => 7],
        ];

        if(Auth::guest())
        {
            $menu[] = ['title' => 'Login', 'url' => route('gapura.login'), 'keymap' => 0];
        }
        else
        {
            $menu[] = ['title' => 'Logout', 'url' => route('gapura.logout'), 'keymap' => 0];
        }

        return new Collection($menu);
    }
}