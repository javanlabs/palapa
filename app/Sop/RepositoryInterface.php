<?php namespace App\Sop;

interface RepositoryInterface {

    public function all();

    public function incrementPhase($case, $phase);

}
