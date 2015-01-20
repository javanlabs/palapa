@extends('layouts.admin.admin')

@section('content-admin')
    <h2 class="page-title">Manajemen SDM <a class="btn btn-default" href="{{ route('backend.officers.create') }}"><i class="ion-plus"></i> Tambah</a></h2>
    @include('backend.officers.tab', ['active' => $role])
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Nama</th>
                <th>NIP</th>
                <th>Pangkat</th>
                <th>Jabatan</th>
                <th style="width: 130px">Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach($officers as $officer)
            <tr>
                <td>{{ $officer['name'] }}</td>
                <td>{{ $officer['nip'] }}</td>
                <td>{{ $officer['pangkat_name'] }}</td>
                <td>{{ $officer['jabatan_name'] }}</td>
                <td>
                    <div class="btn-group">
                        <a href="{{ route('backend.officers.edit', [$officer->id]) }}" class="btn btn-default btn-xs">Edit</a>
                        {{ Form::delete(route('backend.officers.destroy', [$officer->id]), 'Delete', ['class' => 'form-delete'], ['class' => 'btn btn-xs btn-danger']) }}
                    </div>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
@stop
