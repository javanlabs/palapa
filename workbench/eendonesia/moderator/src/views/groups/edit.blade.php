@extends('moderator::layouts.default')

@section('content')
    <div class="container">
        <h2>Edit Group</h2>
        {{ BootForm::open()->put()->action(route('moderator.groups.update', [$group->id])) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Name', 'name', $group->name) }}
            {{ BootForm::text('Description', 'description', $group->description) }}
            {{ BootForm::submit('Update') }}
        {{ BootForm::close() }}
    </div>
@stop
