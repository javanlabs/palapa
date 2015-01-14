@extends('layouts.admin.admin')

@section('content-admin')
    <h2>Manajemen SDM</h2>
    <a href="{{ route('backend.officers.create') }}">Tambah SDM</a>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>NIP</th>
                <th>Pangkat</th>
                <th>Jabatan</th>
                <th>Aksi</th>
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
                    <a href="{{ route('backend.officers.edit', [$officer->id]) }}" class="btn btn-link">Edit</a>
                    {{ Form::delete(route('backend.officers.destroy', [$officer->id]), 'Delete', [], ['class' => 'btn-link']) }}
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
@stop
