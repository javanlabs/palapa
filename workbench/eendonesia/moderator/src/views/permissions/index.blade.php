@extends('moderator::layouts.default')

@section('content')

<div class="container">
    <h2>Manage Permission</h2>
    <div class="row">
        <div class="col-md-4">
            <div class="list-group">
                @foreach($groups as $group)
                <a href="{{ route('moderator.permissions.index', [$group->id]) }}" class="list-group-item {{ ($selectedGroup && $group->id == $selectedGroup->id)?'active':'' }}">
                    <h4 class="list-group-item-heading">{{ $group->name }}</h4>
                    <p class="list-group-item-text">{{ $group->description }}</p>
                </a>
                @endforeach
            </div>
        </div>
        @if($selectedGroup)
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading"><strong>{{ $selectedGroup->name }}</strong> <small>allow to access following resources:</small></div>
                <div class="panel-body">
            {{ BootForm::open()->action(route('moderator.permissions.assign')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <input type="hidden" name="id" value="{{ $selectedGroup->id }}"/>
            @foreach($resources as $resource)
                @if(in_array($resource->id, $groupResources))
                {{ BootForm::checkbox($resource->name, 'resources[]')->value($resource->id)->check() }}
                @else
                {{ BootForm::checkbox($resource->name, 'resources[]')->value($resource->id) }}
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
