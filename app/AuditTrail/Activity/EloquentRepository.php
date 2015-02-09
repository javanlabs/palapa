<?php namespace App\AuditTrail\Activity;

use App\AuditTrail\Revision;

class EloquentRepository implements RepositoryInterface {


    /**
     * @var Activity
     */
    private $activity;
    /**
     * @var Revision
     */
    private $revision;

    function __construct(Activity $activity, Revision $revision)
    {
        $this->activity = $activity;
        $this->revision = $revision;
    }

    public function insert($case, $subject, $predicate, $object = null, $note = null, $parentId = null)
    {
        $data = [
            'case_id'      => $case->getKey(),
            'subject_id'   => $subject->getKey(),
            'subject_type' => get_class($subject),
            'predicate'    => $predicate,
            'object_id'    => $object->getKey(),
            'object_type'  => get_class($object),
            'note'         => $note,
            'parent_id'    => $parentId,
        ];

        return $this->activity->create($data);
    }

    public function paginate($keyword)
    {
        $query = $this->activity
            ->select('log_activities.*', 'cases.kasus', 'users.name')
            ->join('cases', 'case_id', '=', 'cases.id')
            ->join('users', 'subject_id', '=', 'users.id')
            ->orderBy('created_at' ,' desc');

        if($keyword)
        {
            $query->where('cases.kasus', 'like', "%$keyword%")->orWhere('users.name', 'like', "%$keyword%");
        }

        return $query->paginate();
    }

    public function find($id)
    {
        return $this->activity->findOrFail($id);
    }

    //public function revisionsByActivity($id)
    //{
    //    return $this->revision->where('activity_id', '=', $id)->get();
    //}
}