@extends('layouts.full.full')

@section('breadcrumb-title')
    {{ array_get($types, Input::get('type', 201), 'Cari Kasus') }}
@stop

@section('content')

    <div class="row text-center" style="margin-bottom: 20px">

        {{ Form::open(['route' => ['frontend.search'], 'method' => 'get', 'role' => 'form', 'id' => 'formSearch']) }}
        <div class="well clearfix" style="padding: 40px">
            <div class="col-md-4">
                {{ Form::select('type', $types, Input::get('type'), ['class' => 'form-control']) }}
            </div>
            <div class="col-md-8">
                <div class="input-group">
                    <input type="text" class="form-control" name="q" value="{{ Input::get('q') }}" placeholder="Cari nama kasus atau nomor SPDP">

                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="submit"><span class="fa fa-search"></span> Cari Kasus</button>
                    </span>
                </div>
            </div>
        </div>
        {{ Form::close() }}

    </div>

<div class="container-fluid">
@if(count($cases) > 0)
    <div class="panel panel-default">
        <div class="panel-heading">
            {{ count($cases) }} kasus ditemukan
            <div class="pull-right" style="font-size: .9em">
                <i class="fa fa-square success" style="color: {{ Config::get('color.green') }}"></i> Tepat Waktu
                &nbsp;&nbsp;&nbsp;
                <i class="fa fa-square warning" style="color: {{ Config::get('color.yellow') }}"></i> Hampir Terlambat
                &nbsp;&nbsp;&nbsp;
                <i class="fa fa-square danger" style="color: {{ Config::get('color.red') }}"></i> Terlambat
            </div>
        </div>

        <table class="table table-bordered section-case-tracking">
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
                </td>
                <td>
                    <div>{{ $item['prosecutor_name'] }}</div>
                    <small class="text-muted">No SPDP {{ $item['spdp_number'] }}</small>
                </td>
                <td colspan="{{ count($phases) }}" style="padding: 20px 10px">
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
                    {{ Form::delete(route('backend.cases.delete', $item['id']), 'Hapus', [], ['class' => 'btn btn-link btn-xs']) }}
                </td>
                @endif
            </tr>
            @endforeach
        </table>
    </div>
@else
    @if(Input::get('q'))
    <p class="alert alert-warning">Tidak ada kasus sesuai kriteria pencarian Anda.</p>
    @endif
@endif
</div>

@stop

@section('script-end')
    @parent
    <script>
    $(function(){
        $('[data-toggle="tooltip"]').tooltip({container:'body'})
        $('.progress-bar').popover({trigger: 'hover', placement:'top', html:true})

        $('#formSearch').on('change', 'select[name=type]', function(e){
            $('#formSearch').submit();
        });
    });
    </script>
@stop
