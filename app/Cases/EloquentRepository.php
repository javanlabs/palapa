<?php namespace App\Cases;

use Carbon\Carbon;
use Faker\Factory;

class EloquentRepository implements RepositoryInterface {

    /**
     * @type case
     */
    private $case;

    function __construct(Cases $case)
    {

        $this->case = $case;
    }

    public function all()
    {
        return $this->case->all();
    }

    public function create($input, $user)
    {
        $case = $this->case->create($input);
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
        foreach($case->checklist as $checklist)
        {
            $activities[] = [
                'date'  => Carbon::createFromFormat('Y-m-d', $checklist->pivot->date)->format('j F Y'),
                'name'  => $checklist['name'],
                'note'  => $checklist->pivot->note
            ];
        }

        return $activities;
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

