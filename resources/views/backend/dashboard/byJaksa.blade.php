@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">Statistik</span>
@stop

@section('content-admin')

    @include('backend.dashboard.tab', ['active' => 'byJaksa'])

    <table class="table">
        <thead>
            <tr>
                <th rowspan="2" class="text-center">Nama Jaksa</th>
                <th colspan="2" class="text-center">Jumlah Kasus</th>
            </tr>
            <tr>
                <th class="text-center">Aktif</th>
                <th class="text-center">Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($officers as $officer)
            <tr>
                <td>{{ $officer->name }}</td>
                <td class="text-center">{{ $officer->activeCases->count() }}</td>
                <td class="text-center">{{ $officer->cases->count() }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
@stop