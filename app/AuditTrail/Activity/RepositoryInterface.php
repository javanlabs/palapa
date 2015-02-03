<?php namespace App\AuditTrail\Activity;

interface RepositoryInterface {

    public function insert($subject, $predicate, $object = null, $note = null, $parentId = null);

}