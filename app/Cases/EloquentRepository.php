<?php namespace App\Cases;

use App\Sop\Phase;
use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Support\Facades\DB;

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

        if($type){
            if($type=='jaksa'){
                $query->where('jaksa_id','=',$keyword);
            }
        }
        else
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

    public function statisticByPhase($year)
    {
        $json = [];
        $phases = $this->phase->orderBy('ordinal')->get();

        //initialization
        foreach(range(1,12) as $month)
        {
            $data = ['month' => Carbon::createFromDate(null, $month, null)->formatLocalized('%B')];
            foreach($phases as $phase)
            {
                $data[$phase->name] = 0;
            }
            $json[$month] = $data;
        }

        $cases = $this->case
            ->select([
                    'phase_id',
                    DB::raw('COUNT(1) as count'),
                    DB::raw('MONTH(start_date) as month'),
                    DB::raw('YEAR(start_date) as year')
                ])
            ->join('sop_phase', 'phase_id', '=', 'sop_phase.id')
            ->whereRaw('YEAR(start_date) = ' . $year)
            ->groupBy(['phase_id', DB::raw('MONTH(start_date)'), DB::raw('YEAR(start_date)')])
            ->get();

        foreach(range(1,12) as $month)
        {
            foreach($phases as $phase)
            {
                $id = $phase->id;
                $name = $phase->name;

                $data = array_first($cases, function($key, $element) use ($month, $id){

                    if($element['month'] == $month && ($element['phase_id'] == $id))
                    {
                        return true;
                    }
                });

                if($data)
                {
                    $json[$month][$name] = (int) $data['count'];
                }
            }
        }

        $series = [];
        foreach($phases as $phase)
        {
            $series[] = [
                'valueField'    => $phase->name,
                'name'          => $phase->name,
                'color'         => $phase->color
            ];
        }

        return ['series' => json_encode($series), 'data' => json_encode(array_values($json))];
    }
    public function statisticByStatus()
    {
        $json = [];

        $phases = $this->phase->all();
        $cases = $this->case->groupBy('phase_id')->all();

        dd($cases);

        return json_encode($json);
    }
    public function statisticByJaksa()
    {
        $json = [];

        $phases = $this->phase->all();
        $cases = $this->case->groupBy('phase_id')->all();

        dd($cases);

        return json_encode($json);
    }
}

