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

    public function jaksa()
    {
        return $this->officer->lists('name', 'id');
    }

    public function staff()
    {
        // TODO: Implement staff() method.
    }

}

