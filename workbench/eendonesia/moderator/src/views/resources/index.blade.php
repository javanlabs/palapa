@extends('moderator::layouts.default')

@section('content')

<div class="container">
    <h2>Manage Resource</h2>
    <a href="{{ route('moderator.resources.create') }}">Add Resource</a>

    <table class="table">
        <tbody>
        @foreach($resources as $resource)
        <tr>
            <td>{{ $resource->name }}</td>
            <td>{{ $resource->description }}</td>
            <td>
                <a href="{{ route('moderator.resources.edit', [$resource->id]) }}">Edit</a>
                {{ Form::delete(route('moderator.resources.destroy', [$resource->id]), 'Delete') }}
            </td>
        </tr>
        @endforeach
        </tbody>
    </table>
</div>

@stop
