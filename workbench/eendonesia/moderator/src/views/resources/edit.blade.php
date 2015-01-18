@extends('moderator::layouts.default')

@section('content')
    <div class="container">
        <h2>Edit Resource</h2>
        {{ BootForm::open()->put()->action(route('moderator.resources.update', [$resource->id])) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Name', 'name', $resource->name) }}
            {{ BootForm::text('Description', 'description', $resource->description) }}
            {{ BootForm::submit('Update') }}
        {{ BootForm::close() }}
    </div>
@stop
