@extends('moderator::layouts.default')

@section('content')
    <div class="container">
        <h2>Create Resource</h2>
        {{ BootForm::open()->action(route('moderator.resources.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Name', 'name') }}
            {{ BootForm::text('Description', 'description') }}
            {{ BootForm::submit('Submit') }}
        {{ BootForm::close() }}
    </div>
@stop
