@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">Halaman Informasi</span>
@stop

@section('content-admin')
<div class="container-fluid">
    <h2 class="page-title">Halaman Informasi <a href="{{ route('skrip.posts.create') }}" class="btn btn-default"><i class="ion-plus"></i> Buat Baru</a></h2>

    @include('skrip::posts.tab', ['active' => $position])

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Title</th>
                <th>Status</th>
                <th class="text-center">Aksi</th>
            </tr>
        </thead>
        <tbody>
        @foreach($posts as $post)
        <tr>
            <td>{{ $post->title }}</td>
            <td>{{ $post->status}}</td>
            <td class="text-center">
                <div class="btn-group text-center">
                    <a href="{{ route('skrip.posts.edit', [$post->id]) }}" class="btn btn-default btn-sm">Edit</a>
                    {{ Form::delete(route('skrip.posts.destroy', [$post->id]), 'Delete', ['class' => 'form-delete'], ['class' => 'btn btn-danger btn-sm']) }}
                </div>
            </td>
        </tr>
        @endforeach
        </tbody>
    </table>
</div>
@stop
