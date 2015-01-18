@extends('moderator::layouts.default')

@section('content')

<div class="container">
    <h2>Manage User Roles</h2>
    <div class="row">
        <div class="col-md-4">
            <div class="list-group">
                @foreach($users as $user)
                <a href="{{ route('moderator.roles.index', [$user->id]) }}" class="list-group-item {{ ($selectedUser && $user->id == $selectedUser->id)?'active':'' }}">
                    {{ $user->name }}
                </a>
                @endforeach
            </div>
        </div>
        @if($selectedUser)
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading"><strong>{{ $selectedUser->name }}</strong> <small>belongs to following groups:</small></div>
                <div class="panel-body">
            {{ BootForm::open()->action(route('moderator.roles.assign')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <input type="hidden" name="id" value="{{ $selectedUser->id }}"/>
            @foreach($groups as $group)
                @if(in_array($group->id, $userGroups))
                {{ BootForm::checkbox($group->name, 'groups[]')->value($group->id)->check() }}
                @else
                {{ BootForm::checkbox($group->name, 'groups[]')->value($group->id) }}
                @endif
            @endforeach
            {{ BootForm::submit('Save') }}
            {{ BootForm::close() }}

                </div>
            </div>
        </div>
        @endif
    </div>
</div>

@stop
