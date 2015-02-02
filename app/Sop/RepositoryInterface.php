<?php namespace App\Sop;

interface RepositoryInterface {

    public function all();

    public function byType($type);

    public function addChecklist($case, $checklist, $attributes);

    public function removeChecklist($case, $checklist);

    public function incrementPhase($case, $phase, $date);

    public function decrementPhase($case, $phase);

    public function checklistRemainingDay($case, $checklist);

}
