<?php namespace App\Cases;

interface RepositoryInterface {

    public function all();

    public function byJaksa($id);

    public function create($input, $user);

    public function update($id, $input, $user);

    public function find($id);

    public function delete($id, $user);

    public function search($keyword, $type = null, $includeDraft = false, $owner = null);

    public function activities($case);

    public function statisticByPhase($year, $type);

    public function statisticByStatus($year, $type = null);

    public function countActive();

    public function countNewToday();

    public function countNewThisWeek();

    public function countNewThisMonth();

    public function sidangToday();

    public function upcomingSidang();
}
