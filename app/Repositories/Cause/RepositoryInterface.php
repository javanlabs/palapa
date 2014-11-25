<?php namespace App\Repositories\Cause;

interface RepositoryInterface {

    public function search($keyword, $type);

    public function histories($id);

    public function dailyCaseStatistic($from, $to);

}
