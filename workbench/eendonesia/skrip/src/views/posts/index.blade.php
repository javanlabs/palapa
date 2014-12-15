@extends('layouts.frontend.frontend')

@section('content')
<div class="container">
    <h2>Post</h2>
    <a href="{{ route('skrip.posts.create') }}">Create Post</a>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Position</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
        @foreach($posts as $post)
        <tr>
            <td>{{ $post->id }}</td>
            <td>{{ $post->title }}</td>
            <td>{{ $post->author->name }}</td>
            <td>{{ $post->position}}</td>
            <td>{{ $post->status}}</td>
            <td>
                <a href="{{ route('skrip.posts.edit', [$post->id]) }}" class="btn btn-link">Edit</a>
                {{ Form::delete(route('skrip.posts.destroy', [$post->id]), 'Delete', [], ['class' => 'btn-link']) }}
            </td>
        </tr>
        @endforeach
        </tbody>
    </table>
</div>
@stop
