<?php namespace App\Officer;

class EloquentRepository implements RepositoryInterface {

    /**
     * @type officer
     */
    private $officer;

    function __construct(Officer $officer)
    {

        $this->officer = $officer;
    }

    public function all()
    {
        return $this->officer->orderBy('name', 'asc')->get();
    }

    public function jaksa()
    {
        return $this->officer->jaksa()->orderBy('name', 'asc')->get();
    }

    public function staff()
    {
        return $this->officer->staff()->orderBy('name', 'asc')->get();
    }

    public function create($input)
    {
        $officer = $this->officer->create($input);

        return $officer;
    }

    public function update($id, $input)
    {
        return $this->officer->findOrFail($id)->update($input);
    }

    public function find($id)
    {
        return $this->officer->findOrFail($id);
    }

    public function delete($id)
    {
        return $this->officer->findOrFail($id)->delete();
    }

    public function listJaksa()
    {
        return $this->officer->jaksa()->lists('name', 'id');
    }

    public function listStaff()
    {
        return $this->officer->staff()->lists('name', 'id');
    }

    public function jaksaByCase()
    {
        $officer = $this->officer->jaksa()->all();

        return $officer->sort(function($elm1, $elm2){
            return $elm1->activeCases->count() < $elm2->activeCases->count();
        });
    }
}

