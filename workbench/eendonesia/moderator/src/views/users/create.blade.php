@extends('moderator::layouts.default')

@section('content')
    <div class="container">
        <h2>Add User</h2>
        {{ BootForm::open()->action(route('moderator.users.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Name', 'name') }}
            {{ BootForm::text('Email', 'email') }}
            {{ BootForm::text('Password', 'password') }}

            <label for="">Group</label>
            @foreach($groups as $key => $group)
                <div class="checkbox">
                    <label class="control-label">
                    {{ Form::checkbox('groups[' . $key . ']', $group->id, Input::old('groups[' . $key . ']')) }}
                    {{ $group->name }}
                    </label>
                </div>
            @endforeach

            {{ BootForm::submit('Add') }}
        {{ BootForm::close() }}
    </div>
@stop
