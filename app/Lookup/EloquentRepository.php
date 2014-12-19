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

    public function lists($type, $empty = null)
    {
        $list = $this->lookup->whereType($type)->lists('name', 'id');

        if($empty)
        {
            $list = ['' => $empty] + $list;
        }

        return $list;
    }

    public function religions()
    {
        $religions = ['Islam', 'Kristen Protestan', 'Katolik', 'Hindu', 'Buddha', 'Kong Hu Cu'];
        return array_combine($religions, $religions);
    }

}
