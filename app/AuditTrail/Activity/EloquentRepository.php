<?php namespace App\AuditTrail\Activity;

class EloquentRepository implements RepositoryInterface {


    /**
     * @var Activity
     */
    private $activity;

    function __construct(Activity $activity)
    {
        $this->activity = $activity;
    }

    public function insert($subject, $predicate, $object = null, $note = null, $parentId = null)
    {
        $data = [
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

}