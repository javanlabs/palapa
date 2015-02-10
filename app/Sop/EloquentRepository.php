<?php namespace App\Sop;


use App\Cases\Document;
use Carbon\Carbon;
use Illuminate\Support\Facades\Event;

class EloquentRepository implements RepositoryInterface {

    /**
     * @type phase
     */
    private $phase;

    /**
     * @type Checklist
     */
    private $checklist;

    /**
     * @var Document
     */
    private $document;

    function __construct(Phase $phase, Checklist $checklist, Document $document)
    {
        $this->phase = $phase;
        $this->checklist = $checklist;
        $this->document = $document;
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

        $checklistAttributes = ['date' => $date, 'note' => array_get($attributes, 'note'), 'number' => array_get($attributes, 'number')];
        $case->checklist()->attach($checklist, $checklistAttributes);

        $case->addActivity($checklist->name, $checklistAttributes['note'], $checklistAttributes['date'], $checklist);

        // update additional case data
        $additionalCaseData = array_get($attributes, 'data', []);

        Event::fire('checklist.checked', [$case, $checklist, $checklistAttributes, $additionalCaseData]);

        if( ! empty($additionalCaseData))
        {
            $case->update($additionalCaseData);
        }


        if($checklist->is_next)
        {
            $this->incrementPhase($case, $checklist, $date);
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

    public function updateChecklist($case, $checklist, $template){

        if(!$checklist || !$case)
        {
            return false;
        }

        $row = \DB::table('cases_checklist')->where('case_id', $case->id)->where('checklist_id', $checklist->id)->first();

        if($row){
            $sql = "UPDATE cases_checklist set updated_at = now() where case_id = :case_id and checklist_id = :checklist_id";
            \DB::statement($sql, array('checklist_id'=>$checklist->id, 'case_id'=>$case->id));
        }
        else{
            $data['date'] = date('d-m-Y');
            $data['note'] = 'Dokumen '.$template->short_title;
            $this->addChecklist($case, $checklist, $data);
        }
        return true;
    }

    public function updateChecklist2($case, $checklist, $attributes)
    {
        if(!$checklist || !$case)
        {
            return false;
        }

        $dmyDate = array_get($attributes, 'date');
        $date = Carbon::createFromFormat('d-m-Y', $dmyDate)->toDateString();

        $checklistAttributes = ['date' => $date, 'note' => array_get($attributes, 'note'), 'number' => array_get($attributes, 'number')];
        $case->checklist()->where('checklist_id', '=', $checklist->id)->update($checklistAttributes);

        // update phase date
        if($checklist->is_first)
        {
            $case->updatePhaseStartDate($checklist->phase, $date);
        }

        if($checklist->is_next)
        {
            $case->updatePhaseFinishDate($checklist->phase, $date);

            if($checklist->phase->nextPhase())
            {
                $case->updatePhaseStartDate($checklist->phase->nextPhase(), $date);
            }
        }

        // update additional case data
        $additionalCaseData = array_get($attributes, 'data', []);

        if( ! empty($additionalCaseData))
        {
            $case->update($additionalCaseData);
        }

        return true;
    }

    public function removeChecklist($case, $checklist)
    {
        if(!$checklist)
        {
            return false;
        }

        $case->checklist()->detach($checklist);
        Event::fire('checklist.unchecked', [$case, $checklist]);

        $case->removeActivity($checklist);

        if($checklist->is_next)
        {
            // cek apakah ada checklist lain dengan type next yg sudah 'checked'
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

    public function incrementPhase($case, $checklist, $date)
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
            $case->closeCurrentPhase($date);

            // update current phase
            $case->phase()->associate($nextPhase)->save();

            // add new phase to history
            $case->phaseHistory()->attach($nextPhase, ['start_date' => $date]);
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

    public function getPhaseHistory($case)
    {
        $histories = [];
        foreach($case->phaseHistory as $phase)
        {
            $item = $phase->toArray();
            $item['start_date'] = $item['finish_date'] = null;
            $startDate = $finishDate = Carbon::now();

            $item['skipped'] = ($phase->pivot->start_date === null && $phase->pivot->finish_date === null);

            if($phase->pivot->start_date)
            {
                $startDate = Carbon::createFromFormat('Y-m-d', $phase->pivot->start_date);
            }
            $item['start_date'] = $startDate->formatLocalized('%d %B %Y');

            if($phase->pivot->finish_date)
            {
                $finishDate = Carbon::createFromFormat('Y-m-d', $phase->pivot->finish_date);
                $item['finish_date'] = $finishDate->formatLocalized('%d %B %Y');
            }

            if($finishDate >= $startDate)
            {
                $item['current_duration'] = $finishDate->diffInDays($startDate);
            }
            else
            {
                $item['current_duration'] = false;
            }

            $histories[$phase->id] = $item;
        }

        return $histories;
    }

    public function skipPhase($case)
    {
        $currentPhase = $case->phase;
        $nextPhase = $currentPhase->nextPhase();

        if($nextPhase)
        {
            // skip current phase
            if($case->hasPhaseHistory($currentPhase))
            {
                $case->updatePhaseStartDate($currentPhase, null);
                $case->updatePhaseFinishDate($currentPhase, null);
            }
            else
            {
                $case->phaseHistory()->attach($currentPhase, ['start_date' => null, 'finish_date' => null]);
            }

            // update current phase
            $case->phase()->associate($nextPhase)->save();

            // add new phase to history
            $case->phaseHistory()->attach($nextPhase, ['start_date' => null]);
        }
        else
        {
            $case->close();
        }

        return true;
    }

    public function addDocument($case, $template, $content)
    {
        $document = $this->document->create([
            'title'		=> $template->name,
            'content'	=> $content,
        ]);

        if(!$document)
        {
            return false;
        }

        Event::fire('document.created', [$case, $document]);

        $document->cases()->associate($case)->save();
        $document->template()->associate($template)->save();

        //Otomatis input ke checklist
        $checklist = $this->checklist->find($template->checklist_id);

        if($checklist)
        {
            $data['date'] = date('d-m-Y');
            $data['note'] = 'Dokumen '.$template->short_title;
            $this->addChecklist($case, $checklist, $data);
        }

        return $document;
    }

    public function updateDocument($id, $content)
    {
        $document = $this->document->findOrFail($id);
        $document->update(['content' => $content]);

        $template = $document->template;
        $case = $document->cases;
        $checklist = $template->checklist;
        $this->updateChecklist($case, $checklist, $template);

        Event::fire('document.updated', [$case, $document]);

        return $document;
    }

    public function deleteDocument($id)
    {
        $document = $this->document->findOrFail($id);
        $template = $document->template;
        $checklist = $template->checklist;
        $case = $document->cases;
        $this->removeChecklist($case, $checklist);

        return $document->delete();

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
