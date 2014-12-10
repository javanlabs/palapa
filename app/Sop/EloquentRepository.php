<?php namespace App\Sop;


class EloquentRepository implements RepositoryInterface {

    /**
     * @type phase
     */
    private $phase;

    /**
     * @type Checklist
     */
    private $checklist;

    function __construct(Phase $phase, Checklist $checklist)
    {
        $this->phase = $phase;
        $this->checklist = $checklist;
    }

    public function all()
    {
        return $this->phase->orderBy('ordinal')->get();
    }

    public function incrementPhase($case, $checklist)
    {
        $currentPhase = $checklist->phase;
        $nextPhase = $currentPhase->nextPhase();

        if($nextPhase)
        {
            $case->phase()->associate($nextPhase)->save();
            $case->phaseHistory()->save($nextPhase);
        }
        else
        {
            $case->close();
        }

        return true;
    }
}
