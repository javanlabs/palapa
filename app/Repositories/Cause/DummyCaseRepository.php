<?php namespace App\Repositories\Cause;

use Faker\Factory;
use Carbon\Carbon;

class DummyCaseRepository implements RepositoryInterface {

    public function search($keyword, $type)
    {
        $faker = Factory::create();
        $cases = [];
        foreach(range(1,20) as $item)
        {
            $cases[] = [
                'name'  => $faker->sentence(),
                'suspect_name'  => $faker->name,
                'investigator_name'  => $faker->name,
                'prosecutor_name'  => $faker->name,
                'status_spdp'   => $faker->randomElement(['success', 'success', 'success', 'warning', 'danger']),
                'status_penuntutan'   => $faker->randomElement(['success', 'success', 'success', 'success', 'warning', 'danger']),
                'status_intel'   => $faker->randomElement(['success','success','success','success','success','success','success', 'warning', 'danger']),
                'last_update'   => $faker->dateTimeBetween($startDate = '-3 months', $endDate = 'now')->format('d M Y'),
            ];
        }

        return $cases;
    }

    public function histories($id)
    {
        $faker = Factory::create();
        $histories = [
            ['name' => 'Penyidik', 'date' => '1 Januari 2014', 'note' => $faker->sentence(), 'status' => ['name' => 'Tepat Waktu', 'label' => 'success']],
            ['name' => 'SPDP', 'date' => '1 Januari 2014', 'note' => $faker->sentence(), 'status' => ['name' => 'Tepat Waktu', 'label' => 'success']],
            ['name' => 'Penuntutan', 'date' => '1 Januari 2014', 'note' => $faker->sentence(), 'status' => ['name' => 'Tepat Waktu', 'label' => 'success']],
            ['name' => 'Eksekusi', 'date' => '1 Januari 2014', 'note' => $faker->sentence(), 'status' => ['name' => 'Terlambat', 'label' => 'danger']],
        ];

        return $histories;
    }

    public function dailyCaseStatistic($from, $to)
    {
        if(!$from)
            $from = Carbon::now()->subMonth();
        else
            $from = Carbon::parse($from);

        if(!$to)
            $to = Carbon::now();
        else
            $to = Carbon::parse($to);

        // initiate
        $json = [];
        for($day=$from->copy();$day<=$to->copy();$day->addDay())
        {
            $total = rand(10, 100);
            $json[] = [
                'day'   => $day->format("d M"),
                'total_current' => $total,
                'total_previous' => $total + rand(-50, 50),
            ];
        }

        return json_encode($json);
    }
}
