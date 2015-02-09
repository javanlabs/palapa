<?php namespace App\AuditTrail\Activity;

interface RepositoryInterface {

    public function insert($case, $subject, $predicate, $object = null, $note = null, $parentId = null);

    public function paginate($keyword);

    public function find($id);
}