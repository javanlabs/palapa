@extends('layouts.frontend.frontend')
@section('content')

    <div class="container-fluid text-center" style="margin-bottom: 20px">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs nav-justified" style="margin-bottom: 40px">
            <li role="presentation" class="{{ ($type == 'pidum')?'active':'' }}"><a href="{{ route('frontend.search', ['type' => 'pidum']) }}?q={{ $keyword }}" aria-controls="profile" role="tab">Pidana Umum</a></li>
            <li role="presentation" class="{{ ($type == 'perdata')?'active':'' }}"><a href="{{ route('frontend.search', ['type' => 'perdata']) }}?q={{ $keyword }}" aria-controls="messages" role="tab">Perdata</a></li>
            <li role="presentation" class="{{ ($type == 'pph')?'active':'' }}"><a href="{{ route('frontend.search', ['type' => 'pph']) }}?q={{ $keyword }}" aria-controls="settings" role="tab">PPH</a></li>
            <li role="presentation" class="{{ ($type == 'tun')?'active':'' }}"><a href="{{ route('frontend.search', ['type' => 'tun']) }}?q={{ $keyword }}" aria-controls="settings" role="tab">TUN</a></li>
        </ul>

        {{ Form::open(['route' => ['frontend.search', 'type' => $type], 'method' => 'get', 'role' => 'form', 'id' => 'formSearch']) }}
        <div class="input-group">
            <input type="text" class="form-control" name="q" value="{{ Input::get('q') }}" placeholder="Cari nama kasus, nomor kasus, atau nama tersangka">

            <span class="input-group-btn">
                <button class="btn btn-primary" type="submit"><span class="fa fa-search"></span> Cari Kasus</button>
            </span>
        </div>
        {{ Form::close() }}

    </div>

@if(count($cases) > 0)

<div class="container-fluid">
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
                {{ Form::delete(route('backend.cases.delete', $item['id']), 'Hapus', [], ['class' => 'btn btn-link btn-xs']) }}
            </td>
            @endif
        </tr>
        @endforeach
    </table>
    </div>
</div>
@endif

@stop

@section('script-end')
    @parent
    <script>
    $(function(){
        $('[data-toggle="tooltip"]').tooltip({container:'body'})
        $('.progress-bar').popover({trigger: 'hover', placement:'top', html:true})

        $('#formSearch').on('click', '.dropdown-menu li a', function(e){
            e.preventDefault();
            $('#formSearch input[name=type]').val($(this).data('id'));
            $('#formSearch .type-label').html($(this).html());
        });
    });
    </script>
@stop
