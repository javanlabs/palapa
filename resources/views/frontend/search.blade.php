@extends('layouts.full.full')

@section('body-class')
    frontend
@stop

@section('breadcrumb')
    <span class="trail">{{ array_get($types, Input::get('type', 201), 'Cari Kasus') }}</span>
@stop

@section('content')

    <div class="container-fluid">
        <div class="col-md-3">
            @include('frontend.tab', ['active' => 'perkara'])
        </div>
        <div class="col-md-9" style="margin-top: 40px">

            <div class="text-center well" style="margin-bottom: 20px">

                {{ Form::open(['route' => ['frontend.search'], 'method' => 'get', 'role' => 'form', 'id' => 'formSearch']) }}
                {{ Form::hidden('type', $type) }}
                <div class="row" style="">
                    {{--<div class="col-md-4">--}}
                        {{--{{ Form::select('type', $types, Input::get('type'), ['class' => 'form-control']) }}--}}
                    {{--</div>--}}
                    <div class="col-md-12">
                        <div class="input-group">
                            <input type="text" class="form-control input-lg" name="q" value="{{ Input::get('q') }}" placeholder="Cari nama perkara atau nomor SPDP">

                            <span class="input-group-btn">
                                <button class="btn btn-lg btn-default" type="submit"><span class="ion-ios-search-strong"></span> Cari Kasus</button>
                            </span>
                        </div>
                    </div>
                </div>
                {{ Form::close() }}

            </div>

            @if(count($cases) > 0)
                <div class="panel panel-default">
                    <div class="panel-heading clearfix">
                        <div class="subtitle pull-left">{{ $count }} perkara</div>
                        <div class="pull-right" style="font-size: .9em">
                            <i class="fa fa-square success color-success"></i> Tepat Waktu
                            &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-square warning color-warning"></i> Hampir Terlambat
                            &nbsp;&nbsp;&nbsp;
                            <i class="fa fa-square danger color-danger"></i> Terlambat
                        </div>
                    </div>

                    <table class="table table-bordered section-case-tracking">
                        <thead>
                        <tr>
                            <th width="200px">Kasus</th>
                            <th width="200px">Jaksa/Penyidik</th>
                            @foreach($phases as $phase)
                                <th width="50px" class="text-center" data-toggle="tooltip" data-placement="top" title="{{ $phase['name'] }}">{{ $phase['icon'] }}</th>
                            @endforeach
                            <th width="100px"></th>
                        </tr>
                        </thead>
                        @foreach($cases as $item)
                        @include('modules.case.row', compact('item', 'phases'))
                        @endforeach
                    </table>
                    <div class="panel-footer">
                        {{ $cases->appends('type', $type)->appends('q', INput::get('q'))->render() }}
                    </div>
                </div>
            @else
                @if(Input::get('q'))
                    <p class="alert alert-warning">Tidak ada perkara sesuai kriteria pencarian Anda.</p>
                @endif
            @endif
        </div>
    </div>



@stop

@section('script-end')
    @parent
    <script>
    $(function(){
        $('[data-toggle="tooltip"]').tooltip({container:'body'})

        $('#formSearch').on('change', 'select[name=type]', function(e){
            $('#formSearch').submit();
        });

        $('.btn-detail').on('click', function(e){
            e.preventDefault();
            $.blockUI(BLOCKUI_STYLE);

            $.get($(this).attr('href'), '', function(response, status){
                $.unblockUI();
                $(response).modal('show');
                $(response).on('hidden.bs.modal', function(e){
                    $(response).remove();
                });
            });

        });

    });
    </script>
@stop
