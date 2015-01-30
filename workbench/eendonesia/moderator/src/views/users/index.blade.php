@extends('layouts.admin.admin')

@section('content-admin')

<div class="container-fluid">
    <div class="panel panel-default">
        <div class="panel-heading">
            <span class="subtitle">{{ count($users) }} User Terdaftar</span>
            {{--<a class="btn btn-default" href="{{ route('moderator.users.create') }}"><i class="ion-plus"></i> Tambah User</a>--}}
        </div>
        <table class="table">
            <thead>
            <tr>
                <th>Nama</th>
                <th>Username/Email</th>
                <th>Aksi</th>
            </tr>
            </thead>
            <tbody>
            @foreach($users as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td class="text-center">
                        <div class="btn-group">
                            <a href="{{ route('moderator.users.edit', [$user->id]) }}" class="btn btn-default btn-xs">Edit</a>
                            {{ Form::delete(route('moderator.users.destroy', [$user->id]), 'Delete', ['class' => 'form-delete'], ['class' => 'btn btn-danger btn-xs btn-delete']) }}
                        </div>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>

@stop
