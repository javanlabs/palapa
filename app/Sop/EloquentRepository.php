<?php namespace App\Sop;


use Carbon\Carbon;

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

    public function addChecklist($case, $checklist, $attributes)
    {
        $checklistAttributes = ['date' => array_get($attributes, 'date'), 'note' => array_get($attributes, 'note')];
        $case->checklist()->attach($checklist, $checklistAttributes);

        $case->addActivity($checklist->name, $checklistAttributes['note'], $checklist);

        if($checklist->is_next)
        {
            $this->incrementPhase($case, $checklist);
        }

        return true;
    }

    public function removeChecklist($case, $checklist)
    {
        $case->checklist()->detach($checklist);

        $case->removeActivity($checklist);

        if($checklist->is_next)
        {
            $this->decrementPhase($case, $checklist);
        }

        return true;
    }

    public function incrementPhase($case, $checklist)
    {
        $currentPhase = $checklist->phase;
        $nextPhase = $currentPhase->nextPhase();

        if($nextPhase)
        {
            // close current phase
            $case->closeCurrentPhase();

            // update current phase
            $case->phase()->associate($nextPhase)->save();

            // add new phase to history
            $case->phaseHistory()->attach($nextPhase, ['start_date' => new Carbon()]);
        }
        else
        {
            $case->close();
        }

        return true;
    }

    public function decrementPhase($case, $checklist)
    {
        $currentPhase = $case->phase;
        $prevPhase = $currentPhase->prevPhase();

        if(!$currentPhase)
        {
            return false;
        }

        if($prevPhase)
        {
            // delete current phase history
            $case->phaseHistory()->detach($currentPhase->id);

            // update current phase
            $case->phase()->associate($prevPhase)->save();

            // set current phase finish_date to null
            $case->reopenPhase($prevPhase);
        }
        else
        {
            $case->close();
        }

        return true;
    }
}
