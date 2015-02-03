<?php namespace App\Cases;

use App\Lookup\EloquentRepository as LookupRepo;
use App\Sop\Checklist;
use App\Sop\Phase;
use App\Sop\RepositoryInterface as SopRepo;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;

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
    /**
     * @var LookupRepo
     */
    private $lookupRepo;

    function __construct(Cases $case, Phase $phase, SopRepo $sop, LookupRepo $lookupRepo)
    {

        $this->case = $case;
        $this->phase = $phase;
        $this->sop = $sop;
        $this->lookupRepo = $lookupRepo;
        $this->config = App::make('config');
    }

    public function all($keyword = null)
    {
        return $this->case->orderBy('created_at', 'desc')->get();
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

            // auto checklist SPDP
            if(isset($input['spdp_date']) && isset($input['spdp_number']))
            {
                $checklist = Checklist::where('phase_id', '=', $defaultPhase->id)->whereOrdinal(1)->first();

                if($checklist)
                {
                    $data['date'] = $input['spdp_diterima_date'];
                    $data['note'] = 'Checklist otomatis ketika register kasus';
                    $this->sop->addChecklist($case, $checklist, $data);
                }
            }

        }
        else
        {
            return false;
        }

        $case->author()->associate($user)->save();

        Event::fire('case.created', [$case, $user]);

        return $case;
    }

    public function update($id, $input, $user)
    {
        $case = $this->case->findOrFail($id);

        $updated = $case->update($input);

        if($updated)
        {
            Event::fire('case.updated', [$case, $user]);
            return $case;
        }

        return false;
    }

    public function find($id)
    {
        return $this->case->findOrFail($id);
    }

    public function delete($id, $user)
    {
        $case = $this->case->findOrFail($id);
        $deleted = $case->delete();

        if($deleted)
        {
            Event::fire('case.deleted', [$case, $user]);
            return $case;
        }

        return false;
    }

    public function search($keyword, $type = null, $includeDraft = false, $me=false)
    {
        $query = $this->prepareSearch($keyword, $type, $includeDraft, $me);

        return $query->paginate($this->config->get('pagination.per_page'));
    }

    public function countSearch($keyword, $type = null, $includeDraft = false, $me=false)
    {
        $query = $this->prepareSearch($keyword, $type, $includeDraft, $me);

        return $query->count();
    }

    public function alert($user)
    {
        $data = $this->prepareAlert($user)->get();

        $case = [];
        foreach($data as $item)
        {
            $dayRemaining = $item['standard_duration'] - $item['current_duration'];
            if($dayRemaining <= 5)
            {
                $item['day_remaining'] = $dayRemaining;
                $case[] = $item;
            }
        }

        return $case;
    }

    public function countAlert($user)
    {
        return count($this->alert($user));
    }

    public function activities($case)
    {
        $activities = [];
        foreach($case->activities as $activity)
        {
            $activities[] = [
                'date_for_human' => $activity['date_for_human'],
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

    public function statisticByStatus($year, $type = null)
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

        $query = $this->case
            ->select([
                    DB::raw('COUNT(1) as count'),
                    DB::raw('MONTH(start_date) as month'),
                ])
            ->whereRaw('YEAR(start_date) = ' . $year)
            ->groupBy([DB::raw('MONTH(start_date)')]);

        if($type)
        {
            $query->where('type_id', '=', $type);
        }
        $openCases = $query->get();

        $query = $this->case
            ->select([
                    DB::raw('COUNT(1) as count'),
                    DB::raw('MONTH(start_date) as month'),
                ])
            ->whereRaw('YEAR(start_date) = ' . $year)
            ->whereNotNull('finish_date')
            ->groupBy([DB::raw('MONTH(finish_date)')]);

        if($type)
        {
            $query->where('type_id', '=', $type);
        }

        $closedCases = $query->get();


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
                $json[$month]['open'] = (int) $openCase['count'];
            }

            $closedCase = array_first($closedCases, function($key, $element) use ($month){

                if($element['month'] == $month)
                {
                    return true;
                }
            });

            if($closedCase)
            {
                $json[$month]['close'] = (int) $closedCase['count'];
            }
        }

        return array_values($json);
    }

    public function statisticByCategory($year, $type)
    {
        $json = [];

        $categories = $this->lookupRepo->categoryPidum();

        //initialization
        foreach(range(1,12) as $month)
        {
            $json[$month]['month'] = Carbon::createFromDate(null, $month, null)->formatLocalized('%B');
            $json[$month]['year'] = $year;

            foreach($categories as $key => $value)
            {
                $json[$month][$key] = 0;
            }
        }

        $query = DB::table('cases')
                  ->select([DB::raw('count(id) count'), 'category', DB::raw('MONTH(start_date) month')])
                  ->whereRaw("YEAR(start_date) = $year")
                  ->whereNotNull('category')
                  ->groupBy(['category', 'month']);
        if($type)
        {
            $query->where('type_id', '=', $type);
        }

        $stat = $query->get();

        foreach($stat as $row)
        {
            $json[$row->month][$row->category] = (int) $row->count;
        }

        $series = [];
        $colors = \Config::get('color');
        $i = 1;

        foreach($categories as $key => $val)
        {
            $series[] = [
                'valueField'    => $key,
                'name'          => $val,
                'color'         => $colors[array_rand(array_slice($colors, $i - 1, 1), 1)]
            ];
            $i++;
        }

        return ['series' => $series, 'data' => array_values($json)];
    }

    public function count()
    {
        return $this->case->count();
    }

    public function countByOwner($owner)
    {
        if($owner->hasGroup('root'))
        {
            $query = $this->case->newQuery();
        }
        else
        {
            $officerId = -999;
            if($owner->officer)
            {
                $officerId = $owner->officer->id;
            }

            $query = $this->case->where(function($query2) use ($owner, $officerId) {
                return $query2->orWhere('author_id', '=', $owner->id)
                              ->orWhere('staff_id', '=', $officerId)
                              ->orWhere('jaksa_id', '=', $officerId)
                              ->orWhere(function($query3) use ($owner, $officerId) {
                                  return $query3->where('penyidik_id', '=', $officerId)
                                                ->where('penyidik_type', '=', 'internal');
                              });
            });
        }

        return $query->count();
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
        return $this->case->where('start_date', '>=', (new Carbon())->subDays(30)->toDateString())->count();
    }

    public function sidangToday()
    {
        return $this->case->where('persidangan_date', '=', (new Carbon())->toDateString())->get();
    }

    public function upcomingSidang()
    {
        return $this->case->where('persidangan_date', '>=', (new Carbon())->toDateString())->orderBy('persidangan_date')->get();
    }

    protected function prepareSearch($keyword, $type, $includeDraft, $me)
    {
        $query = $this->case->orderBy('updated_at', 'DESC');

        if(!$includeDraft)
        {
            $query->published();
        }

        if($type)
        {
            $query->where('type_id', '=', $type);
        }
        if($me){
            $officer_id = -999;
            if(Auth::user()->officer)
            {
                $officer_id = Auth::user()->officer->id;
            }
            $user_id = Auth::user()->id;
            $query->where(function($query2) use ($officer_id, $user_id){
                $query2->where('jaksa_id',$officer_id)->orWhere('staff_id', $officer_id)->orWhere('author_id', $user_id);
            });
        }

        $ids = DB::table('suspects')->join('cases_suspects', 'cases_suspects.suspects_id', '=', 'suspects.id')->select('cases_suspects.cases_id')->where('suspects.name', 'LIKE', '%'.$keyword.'%')->get();
        $cases_ids = array();
        foreach($ids as $t){
            $cases_ids[] = $t->cases_id;
        }



        if($keyword)
        {
            $query->where(function($query2) use ($keyword, $cases_ids){
                $query2->where('kasus', 'LIKE', '%'.$keyword.'%')->orWhere('spdp_number', 'LIKE', '%'.$keyword.'%')->orWhereIn('id', $cases_ids);

            });
        }

        return $query;
    }

    protected function prepareAlert($user)
    {
        if($user->hasGroup('root'))
        {
            $query = $this->case->newQuery();
        }
        else
        {
            $query = $this->case->ownedBy($user);
        }

        $query->select('cases.*', 'v_cases_current_timeline.*')
            ->join('v_cases_current_timeline', 'v_cases_current_timeline.id', '=', 'cases.id')
        ;

        return $query;
    }
}

