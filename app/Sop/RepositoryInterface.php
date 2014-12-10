<?php namespace App\Sop;

interface RepositoryInterface {

    public function all();

    public function addChecklist($case, $checklist, $attributes);

    public function incrementPhase($case, $phase);

}
