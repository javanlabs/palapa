<?php namespace App\Cases;

use App\Sop\Phase;
use App\Sop\RepositoryInterface as SopRepo;
use Carbon\Carbon;
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

    /**
     * @type SopRepo
     */
    private $sop;

    function __construct(Cases $case, Phase $phase, SopRepo $sop)
    {

        $this->case = $case;
        $this->phase = $phase;
        $this->sop = $sop;
    }

    public function all($keyword = null)
    {
        return $this->case->orderBy('created_at', 'desc')->get();

        if($keyword)
        {
            $query->where('kasus', 'LIKE', '%'.$keyword.'%')->orWhere('spdp_number', 'LIKE', '%'.$keyword.'%');
        }


    }

    public function byJaksa($jaksaId)
    {
        return $this->case->published()->where('jaksa_id', '=', $jaksaId)->get();
    }

    public function create($input, $user)
    {

        $case = $this->case->create($input);

        $defaultPhase = $this->phase->where('case_type_id', '=', $case->type_id)->orderBy('ordinal')->first();

        if($defaultPhase)
        {
            $case->phase()->associate($defaultPhase)->save();
        }
        else
        {
            return false;
        }

        $case->author()->associate($user)->save();

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

    public function search($keyword, $type = null)
    {
        $query = $this->case->published()->orderBy('updated_at', 'DESC');

        if($type)
        {
            $query->where('type_id', '=', $type);
        }

        if($keyword)
        {
            $query->where(function($query2) use ($keyword){
                $query2->where('kasus', 'LIKE', '%'.$keyword.'%')->orWhere('spdp_number', 'LIKE', '%'.$keyword.'%');
            });
        }

        return $query->paginate();
    }

    public function activities($case)
    {
        $activities = [];
        foreach($case->activities as $activity)
        {
            $activities[] = [
                'date'  => $activity['date'],
                'name'  => $activity['title'],
                'note'  => $activity['content']
            ];
        }

        return $activities;
    }

    public function addActivity($case, $attributes)
    {
        $attributes['date'] = Carbon::now()->toDateString();
        return $case->activities()->create($attributes);
    }

    public function statisticByPhase($year, $type)
    {
        $json = [];
        $phases = $this->sop->byType(explode(',', $type));

        //initialization
        foreach(range(1,12) as $month)
        {
            $data = ['month' => Carbon::createFromDate(null, $month, null)->formatLocalized('%B'), 'year' => $year];
            foreach($phases as $phase)
            {
                $data[$phase->name] = 0;
            }
            $json[$month] = $data;
        }

        $stat = DB::table('v_monthly_case_phase')
            ->select([DB::raw('count(case_id) count'), 'phase_id', 'month'])
            ->where('year', '=', $year)
            ->groupBy(['phase_id', 'month'])
            ->get();

        foreach(range(1,12) as $month)
        {
            foreach($phases as $phase)
            {
                $id = $phase->id;
                $name = $phase->name;

                $data = array_first($stat, function($key, $element) use ($month, $id){

                    if($element->month == $month && ($element->phase_id == $id))
                    {
                        return true;
                    }
                });

                if($data)
                {
                    $json[$month][$name] = (int) $data->count;
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

        return ['series' => $series, 'data' => array_values($json)];
    }

    public function statisticByStatus($year)
    {
        $json = [];

        //initialization
        foreach(range(1,12) as $month)
        {
            $json[$month]['month'] = Carbon::createFromDate(null, $month, null)->formatLocalized('%B');
            $json[$month]['year'] = $year;
            $json[$month]['open'] = 0;
            $json[$month]['close'] = 0;
        }

        $openCases = $this->case
            ->select([
                    DB::raw('COUNT(1) as count'),
                    DB::raw('MONTH(start_date) as month'),
                ])
            ->whereRaw('YEAR(start_date) = ' . $year)
            ->groupBy([DB::raw('MONTH(start_date)')])
            ->get();

        $closedCases = $this->case
            ->select([
                    DB::raw('COUNT(1) as count'),
                    DB::raw('MONTH(start_date) as month'),
                ])
            ->whereRaw('YEAR(start_date) = ' . $year)
            ->whereNotNull('finish_date')
            ->groupBy([DB::raw('MONTH(finish_date)')])
            ->get();


        foreach(range(1,12) as $month)
        {
            $openCase = array_first($openCases, function($key, $element) use ($month){

                if($element['month'] == $month)
                {
                    return true;
                }
            });

            if($openCase)
            {
                $json[$month]['open'] = $openCase['count'];
            }

            $closedCase = array_first($closedCases, function($key, $element) use ($month){

                if($element['month'] == $month)
                {
                    return true;
                }
            });

            if($closedCase)
            {
                $json[$month]['close'] = $closedCase['count'];
            }
        }

        return array_values($json);
    }

    public function countActive()
    {
        return $this->case->whereStatus(Cases::STATUS_ONGOING)->count();
    }

    public function countNewToday()
    {
        return $this->case->where('start_date', '=', (new Carbon())->toDateString())->count();
    }

    public function countNewThisWeek()
    {
        return $this->case->where('start_date', '>=', (new Carbon())->subWeek()->toDateString())->count();
    }

    public function countNewThisMonth()
    {
        return $this->case->where('start_date', '=', (new Carbon())->subDays(30)->toDateString())->count();
    }

    public function sidangToday()
    {
        return $this->case->where('persidangan_date', '=', (new Carbon())->toDateString())->get();
    }

    public function upcomingSidang()
    {
        return $this->case->where('persidangan_date', '>=', (new Carbon())->toDateString())->orderBy('persidangan_date')->get();
    }
}

