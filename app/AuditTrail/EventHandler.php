<?php namespace App\AuditTrail;

use App\AuditTrail\Activity\RepositoryInterface;
use Illuminate\Support\Facades\Auth;
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
        $events->listen(
            [
                'case.created', 'case.updated', 'case.deleted',
                'document.created', 'document.updated', 'document.deleted',
                'suspect.created', 'suspect.updated', 'suspect.removed',
                'witness.created', 'witness.updated', 'witness.removed',
                'evidence.created', 'evidence.updated', 'evidence.deleted',
                'court.created', 'court.updated', 'court.deleted',
                'case.officer.added', 'case.officer.removed',
                'checklist.checked', 'checklist.unchecked',
            ],
            'App\AuditTrail\EventHandler@auditTrail'
        );
    }

    public function auditTrail($loggable)
    {
        $user = Auth::user();

        $activity = $this->activity->insert($user, Event::firing(), $loggable);

        if($activity)
        {
            $loggable->setActivityId($activity->id);
            $loggable->postSave();
        }
    }

}