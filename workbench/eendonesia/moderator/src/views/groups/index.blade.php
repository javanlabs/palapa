@extends('moderator::layouts.default')

@section('content')

<div class="container">
    <h2>Manage Group</h2>
    <a href="{{ route('moderator.groups.create') }}">Create Group</a>

    <table class="table">
        <tbody>
        @foreach($groups as $group)
        <tr>
            <td>{{ $group->name }}</td>
            <td>{{ $group->description }}</td>
            <td>
                <a href="{{ route('moderator.groups.edit', [$group->id]) }}">Edit</a>
                {{ Form::delete(route('moderator.groups.destroy', [$group->id]), 'Delete') }}
            </td>
        </tr>
        @endforeach
        </tbody>
    </table>
</div>

@stop
