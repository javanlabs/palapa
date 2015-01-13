<?php namespace App\Cases;

interface RepositoryInterface {

    public function all();

    public function byJaksa($id);

    public function create($input, $user);

    public function update($id, $input);

    public function find($id);

    public function delete($id);

    public function search($keyword, $type);

    public function activities($case);

    public function statisticByPhase($year, $type);

    public function statisticByStatus($year);

    public function countActive();

    public function countNewToday();

    public function countNewThisWeek();

    public function countNewThisMonth();

    public function sidangToday();

    public function upcomingSidang();
}
