<?php namespace App\Cases;

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
}

