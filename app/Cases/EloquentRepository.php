<?php namespace App\Cases;

use App\Sop\Phase;
use Carbon\Carbon;
use Faker\Factory;

class EloquentRepository implements RepositoryInterface {

    /**
     * @type case
     */
    private $case;
    /**
     * @type Phase
     */
    private $phase;

    function __construct(Cases $case, Phase $phase)
    {

        $this->case = $case;
        $this->phase = $phase;
    }

    public function all()
    {
        return $this->case->all();
    }

    public function create($input, $user)
    {
        $case = $this->case->create($input);
        $case->author()->associate($user)->save();

        $firstPhase = $this->phase->orderBy('ordinal')->first();
        $attributes = ['start_date' => $input['start_date']];
        $case->phaseHistory()->attach($firstPhase->id, $attributes);

        return $case;
    }

    public function update($id, $input)
    {
        return $this->case->findOrFail($id)->update($input);
    }

    public function find($id)
    {
        return $this->case->findOrFail($id);
    }

    public function delete($id)
    {
        return $this->case->findOrFail($id)->delete();
    }

    public function search($keyword, $type)
    {
        $query = $this->case->orderBy('updated_at', 'DESC');

        if($keyword)
            $query->where('kasus', 'LIKE', '%'.$keyword.'%')->orWhere('suspect_name', 'LIKE', '%'.$keyword.'%')->orWhere('spdp_number', 'LIKE', '%'.$keyword.'%');

        return $query->paginate();
    }

    public function activities($case)
    {
        $activities = [];
        foreach($case->activities as $activity)
        {
            $activities[] = [
                'date'  => $activity->created_at->diffForHumans(),
                'name'  => $activity['title'],
                'note'  => $activity['content']
            ];
        }

        return $activities;
    }

    public function addActivity($case, $attributes)
    {
        return $case->activities()->create($attributes);
    }

    public function dailyCaseStatistic($from, $to)
    {
        if(!$from)
            $from = Carbon::now()->subMonth();
        else
            $from = Carbon::parse($from);

        if(!$to)
            $to = Carbon::now();
        else
            $to = Carbon::parse($to);

        // initiate
        $json = [];
        for($day=$from->copy();$day<=$to->copy();$day->addDay())
        {
            $total = rand(10, 100);
            $json[] = [
                'day'   => $day->format("d M"),
                'total_current' => $total,
                'total_previous' => $total + rand(-50, 50),
            ];
        }

        return json_encode($json);
    }
}

