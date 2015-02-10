<?php namespace App\Lookup;

use App\Cases\Cases;
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

    public function penyidik($type)
    {
        $lists = [];

        if(in_array($type, [Cases::TYPE_PIDUM, Cases::TYPE_PIDSUS]))
        {
            $penyidikExternal = $this->lists('penyidik');
            foreach($penyidikExternal as $key=>$val)
            {
                $penyidikExternal['e' . $key] = $val;
                unset($penyidikExternal[$key]);
            }
            if($penyidikExternal)
            {
                $lists = ['Penyidik Eksternal' => $penyidikExternal];
            }

        }

        if(in_array($type, [Cases::TYPE_PIDSUS, Cases::TYPE_DATUN]))
        {
            $penyidikInternal = $this->officer->listJaksa();
            foreach($penyidikInternal as $key=>$val)
            {
                $penyidikInternal['i' . $key] = $val;
                unset($penyidikInternal[$key]);
            }
            if($penyidikInternal)
            {
                $lists['Penyidik Internal'] = $penyidikInternal;
            }
        }

        return $lists;
    }

    public function categoryPidum($empty = null)
    {
        $list = ['tpul' => 'TPUL', 'oharda' => 'OHARDA', 'kamtibum' => 'KAMTIBUM', 'perkara-anak-diversi'=> 'PERKARA ANAK DIVERSI', 'perkara-anak-korban' => 'PERKARA ANAK KORBAN', 'perkara-anak-pra-penuntutan'=> 'PERKARA ANAK PRA PENUNTUTAN'];

        if($empty)
        {
            $list = ['' => $empty] + $list;
        }

        return $list;
    }

    public function categoryPidsus($empty = null)
    {
        $list = ['korupsi' => 'Korupsi', 'ham' => 'HAM', 'pajak' => 'Pajak'];

        if($empty)
        {
            $list = ['' => $empty] + $list;
        }

        return $list;
    }

    public function categoryDatun($empty = null)
    {
        $list = ['bankum' => 'BANKUM', 'timkum'=>"TIMKUM", 'yankum'=>"YANKUM", 'thl'=>"THL"];

        if($empty)
        {
            $list = ['' => $empty] + $list;
        }

        return $list;
    }

    public function caseCategoryByType($type, $empty = null)
    {
        switch($type)
        {
            case Cases::TYPE_PIDUM:
                $list = $this->categoryPidum($empty);
                break;
            case Cases::TYPE_PIDSUS:
                $list = $this->categoryPidsus($empty);
                break;
            case Cases::TYPE_DATUN:
                $list = $this->categoryDatun($empty);
                break;
        }

        return $list;
    }
}
