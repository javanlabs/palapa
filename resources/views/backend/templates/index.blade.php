@extends('layouts.frontend.frontend')

@section('content')
<div class="container">
    <h2>Template Surat</h2>
    <a href="{{ route('backend.templates.create') }}">Buat Template</a>
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>               
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
        @if(count($templates))
        @foreach($templates as $template)
        <tr>
            <td>{{ $template->id }}</td>
            <td>{{ $template->title }}</td>
            <td>{{ $template->author?$template->author->name:'' }}</td>
            <td>
                <a href="{{ route('backend.templates.edit', [$template->id]) }}" class="btn btn-link">Edit</a>
                {{ Form::delete(route('backend.templates.destroy', [$template->id]), 'Delete', [], ['class' => 'btn-link']) }}
            </td>
        </tr>
        @endforeach
        @endif
        </tbody>
    </table>
</div>
@stop
