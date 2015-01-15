@extends('layouts.admin.admin')

@section('content-admin')
    <div id="page-case-index">
        <h2 class="page-title">Manajemen Kasus</h2>

        <table class="table table-case">
            <thead>
            <tr>
                <th>Kasus</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            @foreach($cases as $item)
                <tr>
                    <td>{{ $item['name'] }}</td>
                    <td>
                        <span class="badge badge-status {{ $item['status'] }}">{{ $item['status'] }}</span>
                        <span class="badge badge-type {{ $item['type_name'] }}">{{ $item['type_name'] }}</span>
                    </td>
                    <td>
                        <a class="btn btn-default btn-sm" href="{{ $item['permalink'] }}" target="_blank">Edit <i class="fa fa-chevron-right"></i></a>
                        {{ Form::delete(route('backend.cases.delete', $item['id']), 'Hapus', [], ['class' => 'btn btn-link btn-xs']) }}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@stop
