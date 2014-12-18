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

    public function find($id)
    {
        return $this->lookup->findOrFail($id);
    }

    public function lists($type)
    {
        return $this->lookup->whereType($type)->lists('name', 'id');
    }

    public function religions()
    {
        $religions = ['Islam', 'Kristen Protestan', 'Katolik', 'Hindu', 'Buddha', 'Kong Hu Cu'];
        return array_combine($religions, $religions);
    }

}
