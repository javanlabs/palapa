<?php namespace App\AuditTrail;


trait RevisionableTrait {

    use \Venturecraft\Revisionable\RevisionableTrait;

    protected $activityId = null;

    protected  $dontKeepRevisionOf = ['deleted_at'];

    protected function revisionsLinkToActivity()
    {
        return true;
    }

    public function setActivityId($id)
    {
        $this->activityId = $id;
    }

    public function getActivityId()
    {
        return $this->activityId;
    }

    public static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            $model->preSave();
        });

        static::saved(function ($model) {
            if(!$model->revisionsLinkToActivity())
            {
                $model->postSave();
            }
        });

        static::deleted(function ($model) {
            $model->preSave();
            if(!$model->revisionsLinkToActivity())
            {
                $model->postDelete();
            }
        });

    }

    /**
     * Called after a model is successfully saved.
     *
     * @return void
     */
    public function postSave()
    {
        // check if the model already exists
        if ((!isset($this->revisionEnabled) || $this->revisionEnabled)) {
            // if it does, it means we're updating

            $changes_to_record = $this->changedRevisionableFields();

            $revisions = array();

            foreach ($changes_to_record as $key => $change) {

                $revisions[] = array(
                    'revisionable_type'     => get_class($this),
                    'revisionable_id'       => $this->getKey(),
                    'key'                   => $key,
                    'old_value'             => array_get($this->originalData, $key),
                    'new_value'             => $this->updatedData[$key],
                    'user_id'               => $this->getUserId(),
                    'created_at'            => new \DateTime(),
                    'updated_at'            => new \DateTime(),
                    'activity_id'           => $this->getActivityId()
                );
            }

            if (count($revisions) > 0) {
                $revision = new Revision();
                \DB::table($revision->getTable())->insert($revisions);
            }

        }

    }

    /**
     * If softdeletes are enabled, store the deleted time
     */
    public function postDelete()
    {
        if ((!isset($this->revisionEnabled) || $this->revisionEnabled)
            && $this->isSoftDelete()
            && $this->isRevisionable('deleted_at')
        ) {
            $revisions[] = array(
                'revisionable_type' => get_class($this),
                'revisionable_id'   => $this->getKey(),
                'key'               => 'deleted_at',
                'old_value'         => null,
                'new_value'         => $this->deleted_at,
                'user_id'           => $this->getUserId(),
                'created_at'        => new \DateTime(),
                'updated_at'        => new \DateTime(),
                'activity_id'       => $this->getActivityId()
            );
            $revision = new \Venturecraft\Revisionable\Revision;
            \DB::table($revision->getTable())->insert($revisions);
        }
    }
}