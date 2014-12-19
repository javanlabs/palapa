@extends('layouts.frontend.frontend')
@section('content')

    <div class="panel panel-default">
        <div class="panel-heading">
            Daftar Jaksa di Kejari Jember
        </div>
    <table class="table">
    <tbody>
    @foreach($officers as $key=>$jaksa)
    <tr>
        <td width="20px"><small>{{ $key+1 }}.</small></td>
        <td>
            <dl class="dl-horizontal">
                <dt>Name</dt>
                <dd>{{ $jaksa->name }}</dd>
                <dt>Pangkat / NIP</dt>
                <dd>{{ $jaksa->pangkat_name }} / {{ $jaksa->nip }}</dd>
                <dt>Jabatan</dt>
                <dd>{{ $jaksa->jabatan_name }}</dd>
            </dl>
        </td>
        <td>
            <a class="btn btn-sm btn-default" href="{{route('frontend.search')}}?type=jaksa&q={{$jaksa->id}}"><span class="label label-info">{{ $jaksa['active_cases_count'] }}</span> Kasus Aktif</a>
        </td>
    </tr>
    @endforeach
    </tbody>
    </table>

    </div>

@stop
