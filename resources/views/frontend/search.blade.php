@extends('layouts.full.full')

@section('breadcrumb')
    <span class="trail">{{ array_get($types, Input::get('type', 201), 'Cari Kasus') }}</span>
@stop

@section('content')

    <div class="container-fluid">
        <div class="col-md-3">
            @include('frontend.tab', ['active' => 'perkara'])
        </div>
        <div class="col-md-9" style="margin-top: 40px">

            <div class="text-center" style="margin-bottom: 20px">

                {{ Form::open(['route' => ['frontend.search'], 'method' => 'get', 'role' => 'form', 'id' => 'formSearch']) }}
                <div class="well clearfix" style="padding: 40px">
                    <div class="col-md-4">
                        {{ Form::select('type', $types, Input::get('type'), ['class' => 'form-control']) }}
                    </div>
                    <div class="col-md-8">
                        <div class="input-group">
                            <input type="text" class="form-control" name="q" value="{{ Input::get('q') }}" placeholder="Cari nama perkara atau nomor SPDP">

                    <span class="input-group-btn">
                        <button class="btn btn-primary" type="submit"><span class="fa fa-search"></span> Cari Kasus</button>
                    </span>
                        </div>
                    </div>
                </div>
                {{ Form::close() }}

            </div>

            @if(count($cases) > 0)
                <div class="panel panel-default">
                    <div class="panel-heading clearfix">
                        <div class="subtitle pull-left">{{ count($cases) }} perkara</div>
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
                            <th width="200px">Jaksa/Penyidik</th>
                            @foreach($phases as $phase)
                                <th width="50px" class="text-center" data-toggle="tooltip" data-placement="top" title="{{ $phase['name'] }}">{{ $phase['icon'] }}</th>
                            @endforeach
                            <th width="100px"></th>
                        </tr>
                        </thead>
                        @foreach($cases as $item)
                            <tr>
                                <td>
                                    <h5 class="mb-0">{{ $item['name'] }}</h5>
                                    <small class="text-muted">No SPDP {{ $item['spdp_number'] }}
                                        <br/>
                                        <strong>{{$item->category}}:</strong>
                                        @foreach($item->suspects as $suspect)
                                            {{$suspect->name}}
                                        @endforeach
                                    </small>

                                </td>
                                <td style="padding: 20px 10px">
                                    <div><i class="ion-person"></i> {{ $item['prosecutor_name'] }}</div>
                                    <hr style="margin-top: 10px; margin-bottom:10px; border-style: dashed none none"/>
                                    <div><i class="ion-ios-people"></i> {{ $item['penyidik_name'] }}</div>
                                </td>
                                <td colspan="{{ count($phases) }}" style="padding: 20px 10px">
                                    <div class="progress" style="margin-bottom: 0">
                                        @foreach($phases as $phase)
                                            <div class="progress-bar progress-bar-{{ $item->getPhaseHistoryStatus($phase->id) }}" role="progressbar" style="width: {{ 100/count($phases) }}%" data-toggle="popover" title="{{ $phase->name }}" data-content="{{ $item->getPhaseHistoryDescription($phase->id) }}"></div>
                                        @endforeach
                                    </div>
                                    <small class="text-muted"><strong><?php echo ($item->getLatestActivityAttribute()?$item->getLatestActivityAttribute()->name:'');?></strong> : {{ $item['last_update'] }}</small>
                                    <div>

                                </div>
                                </td>
                                <td class="text-center">
                                    <a class="btn btn-default btn-sm btn-detail" href="{{ $item['permalink'] }}">Info <i class="fa fa-chevron-right"></i></a>
                                </td>
                            </tr>
                        @endforeach
                    </table>
                    <div class="panel-footer">
                        {{ $cases->render() }}
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
        $('.progress-bar').popover({trigger: 'hover', placement:'top', html:true})

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
