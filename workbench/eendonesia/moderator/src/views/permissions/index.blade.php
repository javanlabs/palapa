@extends('layouts.admin.admin')

@section('content-admin')

    <h2 class="page-title">Manage Permission</h2>
    <div class="row">
        <div class="col-md-4">
            <div class="list-group">
                @foreach($groups as $group)
                <a href="{{ route('moderator.permissions.index', [$group->id]) }}" class="list-group-item {{ ($selectedGroup && $group->id == $selectedGroup->id)?'active':'' }}">
                    {{ $group->name }}
                </a>
                @endforeach
            </div>
        </div>
        @if($selectedGroup)
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading"><strong>{{ $selectedGroup->name }}</strong> <small>bisa melakukan hal-hal di bawah ini:</small></div>
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
            {{ BootForm::submit('Simpan', 'btn-primary') }}
            {{ BootForm::close() }}

                </div>
            </div>
        </div>
        @endif
    </div>

@stop
