@extends('moderator::layouts.default')

@section('content')
    <div class="container">
        <h2>Create Group</h2>
        {{ BootForm::open()->action(route('moderator.groups.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Name', 'name') }}
            {{ BootForm::text('Description', 'description') }}
            {{ BootForm::submit('Submit') }}
        {{ BootForm::close() }}
    </div>
@stop
