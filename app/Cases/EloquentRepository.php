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
        $types = $this->getChildTypeIds($type);

        if($type=='jaksa'){
            $query->where('jaksa_id','=',$keyword);
        }
        else
        {
            $query->whereIn('type_id', $types);

            if($keyword)
            {
                $query->where('kasus', 'LIKE', '%'.$keyword.'%')->orWhere('suspect_name', 'LIKE', '%'.$keyword.'%')->orWhere('spdp_number', 'LIKE', '%'.$keyword.'%');
            }
        }

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

    public function getParentTypeList()
    {
        return [
            implode(',', $this->getChildTypeIds('pidum')) => 'Pidana Umum',
            implode(',', $this->getChildTypeIds('perdata')) => 'Perdata',
            implode(',', $this->getChildTypeIds('pph')) => 'PPH',
            implode(',', $this->getChildTypeIds('tun')) => 'TUN',
        ];
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

