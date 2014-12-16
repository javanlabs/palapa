@extends('layouts.frontend.frontend')
@section('content')

    <div class="container-fluid text-center" style="margin-bottom: 20px">
        <h1 style="font-weight: 300">Cari Kasus</h1>

        {{ Form::open(['route' => 'frontend.search', 'method' => 'get', 'role' => 'form']) }}
        <div class="form-group">
            <input type="text" class="form-control input-lg input-block" name="q" value="{{ ($keyword)?$keyword:Input::get('q') }}" placeholder="Cari nama kasus, nomor SPDP, atau nama tersangka">
        </div>

        {{ Form::close() }}
    </div>

<div class="container-fluid">
    <div class="panel panel-default">
        <div class="panel-heading">{{ count($cases) }} kasus ditemukan</div>
        @if(count($cases) > 0)
    <table class="table table-bordered">
        <thead>
            <tr>
                <th width="200px">Kasus</th>
                <th width="200px">Jaksa</th>
                @foreach($phases as $phase)
                <th width="50px" class="text-center" data-toggle="tooltip" data-placement="top" title="{{ $phase['name'] }}">{{ $phase['icon'] }}</th>
                @endforeach
                @if(Auth::check())
                <th width="100px">Aksi</th>
                @endif
            </tr>
        </thead>
        @foreach($cases as $item)
        <tr>
            <td>
                <a href="{{ $item['permalink'] }}" target="_blank"><strong>{{ $item['name'] }}</strong></a>
                <div>{{ $item['suspect_name'] }}</div>
            </td>
            <td>
                <div>{{ $item['prosecutor_name'] }}</div>
                <small class="text-muted">No SPDP {{ $item['spdp_number'] }}</small>
            </td>
            <td colspan="5" style="padding: 20px 10px">
                <div class="progress" style="margin-bottom: 0">
                    @foreach($phases as $phase)
                    <div class="progress-bar progress-bar-{{ $item->getPhaseHistoryStatus($phase->id) }}" role="progressbar" style="width: {{ 100/count($phases) }}%" data-toggle="popover" title="{{ $phase->name }}" data-content="{{ $item->getPhaseHistoryDescription($phase->id) }}"></div>
                    @endforeach
                </div>
                <small class="text-muted">Update terakhir: {{ $item['last_update'] }}</small>
            </td>
            @if(Auth::check())
            <td class="text-center">
                <a class="btn btn-default btn-sm" href="{{ $item['permalink'] }}" target="_blank">Edit <i class="fa fa-chevron-right"></i></a>
            </td>
            @endif
        </tr>
        @endforeach
    </table>
    @endif
    </div>
</div>

@stop

@section('script-end')
    @parent
    <script>
    $(function(){
        $('[data-toggle="tooltip"]').tooltip({container:'body'})
        $('.progress-bar').popover({trigger: 'hover', placement:'top', html:true})
    });
    </script>
@stop
