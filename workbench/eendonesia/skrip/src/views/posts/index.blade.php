@extends('layouts.admin.admin')

@section('content-admin')
<div class="container-fluid">
    <h2 class="page-title">Halaman Informasi <a href="{{ route('skrip.posts.create') }}" class="btn btn-default"><i class="ion-plus"></i> Buat Baru</a></h2>

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
