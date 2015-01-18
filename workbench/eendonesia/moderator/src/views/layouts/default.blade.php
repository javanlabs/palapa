@extends('dekor::layouts.base')

@section('body')

<div class="container">
    <ul class="nav nav-pills">
        <li role="presentation"><a href="{{ route('moderator.users.index') }}">User</a></li>
        <li role="presentation"><a href="{{ route('moderator.roles.index') }}">Roles</a></li>
        <li role="presentation"><a href="{{ route('moderator.permissions.index') }}">Permission</a></li>
        <li role="presentation"><a href="{{ route('moderator.groups.index') }}">Group</a></li>
        <li role="presentation"><a href="{{ route('moderator.resources.index') }}">Resource</a></li>
    </ul>
</div>

@yield('content')
@stop
