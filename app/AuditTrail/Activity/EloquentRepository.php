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
        return $this->activity->create([
            'subject'   => $subject,
            'predicate' => $predicate,
            'object'    => $object,
            'note'      => $note,
            'parent_id' => $parentId,
        ]);
    }

}