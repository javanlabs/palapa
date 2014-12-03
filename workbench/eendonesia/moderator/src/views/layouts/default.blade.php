@extends('dekor::layouts.base')

@section('body')

<div class="container">
    <ul class="nav nav-pills">
        <li role="presentation"><a href="{{ route('moderator.groups.index') }}">Group</a></li>
        <li role="presentation"><a href="{{ route('moderator.resources.index') }}">Resource</a></li>
        <li role="presentation"><a href="{{ route('moderator.permissions.index') }}">Permission</a></li>
    </ul>
</div>

@yield('content')
@stop
