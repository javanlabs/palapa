@extends('moderator::layouts.default')

@section('content')

<div class="container">
    <h2>Manage User</h2>
    <a href="{{ route('moderator.users.create') }}">Add User</a>

    <table class="table">
        <tbody>
        @foreach($users as $user)
        <tr>
            <td>{{ $user->name }}</td>
            <td>{{ $user->email }}</td>
            <td>
                <a href="{{ route('moderator.users.edit', [$user->id]) }}" class="btn btn-link">Edit</a>
                {{ Form::delete(route('moderator.users.destroy', [$user->id]), 'Delete', [], ['class' => 'btn btn-link']) }}
            </td>
        </tr>
        @endforeach
        </tbody>
    </table>
</div>

@stop
