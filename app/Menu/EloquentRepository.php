<?php namespace App\Menu;


use Illuminate\Support\Collection;

class EloquentRepository implements RepositoryInterface {

    public function all()
    {
        $menu = [
            ['title' => 'Cari Kasus', 'url' => '', 'keymap' => 1],
            ['title' => 'Daftar Jaksa', 'url' => '', 'keymap' => 2],
            ['title' => 'Struktur Organisasi', 'url' => '', 'keymap' => 5],
            ['title' => 'Alur Kasus', 'url' => '', 'keymap' => 8],
            ['title' => 'Jadwal Operasional', 'url' => '', 'keymap' => 3],
            ['title' => 'Pengaduan', 'url' => '', 'keymap' => 6],
            ['title' => 'Buku Tamu', 'url' => '', 'keymap' => 9],
            ['title' => 'Galeri', 'url' => '', 'keymap' => 4],
            ['title' => 'Kode Etik', 'url' => '', 'keymap' => 7],
            ['title' => 'Login', 'url' => '', 'keymap' => 0],
        ];

        return new Collection($menu);
    }
}