@extends('moderator::layouts.default')
@section('content')
    <div class="container">
        <h2>Edit User</h2>
        {{ BootForm::open()->put()->action(route('moderator.users.update', [$user->id])) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <input type="hidden" name="id" value="{{ $user->id }}"/>
            {{ BootForm::text('Name', 'name')->value($user->name) }}
            {{ BootForm::text('Email', 'email')->value($user->email) }}

            <label for="">Group</label>
            @foreach($groups as $key => $group)
                <div class="checkbox">
                    <label class="control-label">
                    {{ Form::checkbox('groups[' . $key . ']', $group->id, Input::old('groups[' . $key . ']', in_array($group->id, $userGroups))) }}
                    {{ $group->name }}
                    </label>
                </div>
            @endforeach

            {{ BootForm::submit('Save') }}
        {{ BootForm::close() }}
    </div>
@stop
