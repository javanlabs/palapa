# Palapa Project

## Ini Apa Sih?
**Palapa Project** adalah sebuah sistem informasi monitoring SOP berbasis web yang dibangun diatas framework Laravel. Didesain untuk bisa digunakan secara general di berbagai macam institusi, fokus utama saat ini adalah untuk digunakan di lingkungan Kejaksaan Negeri Republik Indoneisa.

## Kebutuhan Server
Sama seperti laravel, [cek disini](http://laravel.com/docs/master/installation#server-requirements).


## Instalasi

* Clone repository
* Copy `.env.example` ke `.env`, sesuaikan isinya dengan konfigurasi di local.
* `composer install`
* `php artisan key:generate`
* Dari terminal, masuk ke folder proyek, jalankan command `php artisan app:install`.

## Sampel Data
Sampel data untuk simulasi bisa di dump secara manual dari `database/sample-data.sql`. User yang tersedia adalah:
1. root@palapa.dev:root
2. pidsus:pidsus1234
3. pidum:pidum1234

## Kontribusi
[todo]
