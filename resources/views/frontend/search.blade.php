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
                <th width="50px" class="text-center" data-toggle="tooltip" data-placement="top" title="SPDP"><i class="fa fa-file-text-o"></i></th>
                <th width="50px" class="text-center" data-toggle="tooltip" data-placement="top" title="Tahap 1"><strong>1</strong></th>
                <th width="50px" class="text-center" data-toggle="tooltip" data-placement="top" title="Tahap 2"><strong>2</strong></th>
                <th width="50px" class="text-center" data-toggle="tooltip" data-placement="top" title="Penuntutan"><i class="fa fa-legal"></i></th>
                <th width="50px" class="text-center" data-toggle="tooltip" data-placement="top" title="Persidangan"><i class="fa fa-institution"></i></th>
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
                    <div class="progress-bar progress-bar-{{ $item['status_spdp'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="SPDP"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_tahap1'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="Tahap 1"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_tahap2'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="Tahap 2"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_penuntutan'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="Penuntutan"></div>
                    <div class="progress-bar progress-bar-{{ $item['status_persidangan'] }}" role="progressbar" style="width: 20%" data-toggle="popover" title="Persidangan"></div>
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
    });
    </script>
@stop
