<?php namespace App\Lookup;

class EloquentRepository implements RepositoryInterface {

    /**
     * @type lookup
     */
    private $lookup;

    function __construct(Lookup $lookup)
    {

        $this->lookup = $lookup;
    }

    public function lists($type)
    {
        return $this->lookup->whereType($type)->lists('name', 'id');
    }

}
