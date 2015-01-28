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

    public function byType($type)
    {
        if(in_array($type, ['pidum', 'perdata', 'pph', 'tun']))
        {
            $type = $this->getChildTypeIds($type);
        }
        else
        {
            $type = (array) $type;
        }

        if (empty($type))
        {
            return [];
        }

        return $this->phase->whereIn('case_type_id', $type)->orderBy('ordinal')->get();
    }

    public function addChecklist($case, $checklist, $attributes)
    {
        $dmyDate = array_get($attributes, 'date');
        $date = Carbon::createFromFormat('d-m-Y', $dmyDate)->toDateString();

        $checklistAttributes = ['date' => $date, 'note' => array_get($attributes, 'note')];
        $case->checklist()->attach($checklist, $checklistAttributes);

        $case->addActivity($checklist->name, $checklistAttributes['note'], $checklistAttributes['date'], $checklist);

        // update additional case data
        $additionalCaseData = array_get($attributes, 'data', []);

        if( ! empty($additionalCaseData))
        {
            $case->update($additionalCaseData);
        }


        if($checklist->is_next)
        {
            $this->incrementPhase($case, $checklist);
        }

        if($checklist->is_first)
        {
            $case->start($dmyDate);
        }
        elseif ($checklist->is_finish)
        {
            $case->finish();
        }
        elseif($checklist->is_suspend)
        {
            $case->suspend();
        }

        return true;
    }

    public function updateChecklist($case, $checklist){
        $sql = "UPDATE cases_checklist set updated_at = now() where case_id = :case_id and checklist_id = :checklist_id";
        return \DB::statement($sql, array('checklist_id'=>$checklist->id, 'case_id'=>$case->id));
    }

    public function removeChecklist($case, $checklist)
    {
        $case->checklist()->detach($checklist);

        $case->removeActivity($checklist);

        if($checklist->is_next)
        {
            // cek apakah ada checklist lain dengan type yg sudah 'checked'
            // jika ada, maka tidak perlu decrement phase

            $hasNext = false;
            foreach($case->checklist as $checked)
            {
                if(($checked->phase->id == $checklist->phase->id) && $checked->is_next)
                {
                    $hasNext = true;
                    continue;
                }
            }

            if (!$hasNext)
            {
                $this->decrementPhase($case, $checklist);
            }
        }

        if($checklist->is_first)
        {
            $case->unpublish();
        }
        elseif($checklist->is_finish || $checklist->is_suspend)
        {
            $case->publish();
        }

        return true;
    }

    public function incrementPhase($case, $checklist)
    {
        $currentPhase = $case->phase;
        $nextPhase = $currentPhase->nextPhase();

        $targetPhase = $checklist->phase->nextPhase();

        if($nextPhase)
        {
            // Ada kalanya salam satu phase ada dua checklist dengan type 'next'
            // Jika yang satu dicheck, maka phase akan diincrement. Jika kemudian checklist
            // yang satunya dicheck juga, maka tidak perlu diincrement lagi
            if($currentPhase->isHigher($targetPhase))
            {
                return false;
            }

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
            $case->unpublish();
        }

        return true;
    }

    public function checklistRemainingDay($case, $checklist)
    {
        if(!$checklist->ticker || $checklist->duration == 0)
        {
            return false;
        }

        $highestChecklist = $case->highestChecklist->first();

        foreach($case->checklist as $checked)
        {
            if($checked->id == $checklist->ticker->id && ($checklist->ordinal > $highestChecklist->ordinal))
            {
                $checklistAge = Carbon::createFromFormat('Y-m-d', $checked->pivot->date)->diffInDays(new Carbon());
                return $checklist->duration - $checklistAge;
            }
        }
    }

    protected function getChildTypeIds($type)
    {
        $types = [];

        switch($type)
        {
            case 'pidum':
                $types = range(201, 201);
                break;
            case 'perdata':
                $types = range(211, 220);
                break;
            case 'pph':
                $types = range(221, 230);
                break;
            case 'tun':
                $types = range(231, 240);
                break;
        }

        return $types;
    }

}
