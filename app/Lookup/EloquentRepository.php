<?php namespace App\Lookup;

use App\Officer\EloquentRepository as OfficerRepository;

class EloquentRepository implements RepositoryInterface {

    /**
     * @type lookup
     */
    private $lookup;
    /**
     * @var OfficerRepository
     */
    private $officer;

    function __construct(Lookup $lookup, OfficerRepository $officer)
    {

        $this->lookup = $lookup;
        $this->officer = $officer;
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

    public function jenisTahanan()
    {
        $list = ['Belum Ditahan', 'RUTAN', 'Rumah', 'Kota'];
        return array_combine($list, $list);
    }

    public function statusTersangka()
    {
        $list = ['tergugat' => 'Tergugat', 'penggugat' => 'Penggugat', 'pelapor' => 'Pelapor'];
        return $list;
    }

    public function jenisKelamins()
    {
        $list = ['Laki-laki' => 'Laki-laki', 'Perempuan' => 'Perempuan'];
        return $list;
    }

    public function penyidikPidsus()
    {
        $penyidikExternal = $this->lists('penyidik');

        $penyidikInternal = $this->officer->listJaksa();

        foreach($penyidikExternal as $key=>$val)
        {
            $penyidikExternal['e' . $key] = $val;
            unset($penyidikExternal[$key]);
        }

        foreach($penyidikInternal as $key=>$val)
        {
            $penyidikInternal['i' . $key] = $val;
            unset($penyidikInternal[$key]);
        }

        $lists = ['Penyidik Internal' => $penyidikInternal, 'Penyidik Eksternal' => $penyidikExternal];

        return $lists;
    }
}
