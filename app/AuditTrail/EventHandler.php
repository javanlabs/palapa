<?php namespace App\AuditTrail;

use App\AuditTrail\Activity\RepositoryInterface;
use Illuminate\Support\Facades\Event;

class EventHandler {

    /**
     * @var RepositoryInterface
     */
    private $activity;

    function __construct(RepositoryInterface $activity)
    {
        $this->activity = $activity;
    }

    /**
     * Register the listeners for the subscriber.
     *
     * @param  Illuminate\Events\Dispatcher $events
     * @return array
     */
    public function subscribe($events)
    {
        $events->listen('case.created', 'App\AuditTrail\EventHandler@onCaseCreated');
        $events->listen('case.updated', 'App\AuditTrail\EventHandler@onCaseUpdated');
        $events->listen('case.deleted', 'App\AuditTrail\EventHandler@onCaseDeleted');
    }

    public function onCaseCreated($case, $user)
    {
        $activity = $this->activity->insert($user->id, Event::firing(), $case->id);
        if($activity)
        {
            $case->setActivityId($activity->id);
            $case->postSave();
        }
    }

    public function onCaseUpdated($case, $user)
    {
        $activity = $this->activity->insert($user->id, Event::firing(), $case->id);
        if($activity)
        {
            $case->setActivityId($activity->id);
            $case->postSave();
        }
    }

    public function onCaseDeleted($case, $user)
    {
        $activity = $this->activity->insert($user->id, Event::firing(), $case->id);
        if($activity)
        {
            $case->setActivityId($activity->id);
            $case->postSave();
        }
    }
}