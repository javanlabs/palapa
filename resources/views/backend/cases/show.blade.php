@extends('layouts.single')

@section('content')
<div style="padding: 40px">

    <div class="row">
        <div class="col-md-8">
            <h3><i class="fa fa-check-square-o"></i> #{{ $case['spdp_number'] }}</h3>
        </div>
        <div class="col-md-4 text-right">
            <button class="btn btn-default" onclick="javascript:window.close();"><i class="fa fa-times"></i> Tutup Halaman Ini</button>
        </div>
    </div>
        <hr/>

    <div class="row">
    <div class="col-md-7">
        <div class="well">
            <dl class="dl-horizontal case-info">
                <dt>No SPDP :</dt>
                <dd>{{ $case['spdp_number'] }}</dd>
                <dt>Kasus :</dt>
                <dd>{{ $case['name'] }}</dd>
                <dt>Pasal yang Disangkakan :</dt>
                <dd>{{ nl2br($case['pasal']) }}</dd>
                <dt>Tersangka :</dt>
                <dd>{{ $case['suspect_name'] }}</dd>
                <dt>Jaksa :</dt>
                <dd>{{ $case['prosecutor_name'] }}</dd>
                <dt>Staff Administrasi :</dt>
                <dd>{{ $case['staff_name'] }}</dd>
                <dt>Usia Kasus :</dt>
                <dd>{{ $case['age'] }} hari</dd>
                <dt>Status :</dt>
                <dd><span class="label label-primary">{{ $case['status_name'] }}</span></dd>
            </dl>
        </div>

        <hr/>

        <table class="table table-striped">
            <caption>Riwayat Aktivitas</caption>
            @foreach($activities as $item)
            <tr>
                <td width="130px"><small class="text-muted">{{ $item['date'] }}</small></td>
                <td>
                    <strong>{{ $item['name'] }}</strong>
                    <p>{{ $item['note'] }}</p>
                </td>
            </tr>
            @endforeach
        </table>


        @if(Auth::check())
            {{ Form::open(['route' => ['backend.cases.activity', $case['id']], 'method' => 'post', 'role'=>'form']) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <div class="form-group">
                {{ Form::textarea('content', '', ['class' => 'form-control', 'rows' => 3]) }}
            </div>
            <div class="text-right">
                {{ Form::submit('Tambah Catatan', ['class' => 'btn btn-primary']) }}
            </div>
            {{ Form::close() }}
        @endif
    <table class="table table-striped">
            <caption>Dokumen</caption>
            @foreach($activities as $item)
            <tr>
                <td width="130px"><small class="text-muted">{{ $item['date'] }}</small></td>
                <td>
                    <strong>{{ $item['name'] }}</strong>
                    <p>{{ $item['note'] }}</p>
                </td>
            </tr>
            @endforeach
        </table>
            @if(Auth::check())
            {{ Form::open(["url"=>'/backend/document/create', 'method' => 'get', 'role'=>'form']) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{Form::hidden('case_id',$case->id)}}
            <div class="form-group">
                {{ Form::select('template_id', $templates , ['class' => 'form-control', 'rows' => 3]) }}
            </div>
            <div class="text-right">
                {{ Form::submit('Buat', ['class' => 'btn btn-primary']) }}
            </div>
            {{ Form::close() }}
        @endif
    </div>
    <div class="col-md-5">
        <div class="panel panel-default">
            @foreach($phases as $phase)
            <div class="panel-heading"><strong>{{ $phase['name'] }}</strong></div>
            <ul class="list-group {{ (($phase->id > $case['phase']['id']) && $phase->id != $case['phase_id'])?'disabled':'' }}">
                @foreach($phase['checklist'] as $item)

                    @if(in_array($item['id'], $checklistIds))
                        <li class="list-group-item list-group-item-success">

                            @if($case->isLatestChecklist($item))
                            {{ Form::open(['route' => ['backend.cases.unchecklist', $case->id, $item['id']], 'method' => 'post', 'class' => 'pull-right']) }}
                            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                            {{ Form::submit('Batal', ['class' => 'btn btn-link']) }}
                            {{ Form::close() }}
                            @endif

                            <i class="fa fa-check"></i>
                            {{ $item['name'] }}
                            @foreach($item->templates as $row)
                                {{$row->title}}
                            @endforeach
                        </li>
                    @else
                        <li class="list-group-item item-checklist" data-id="{{ $item['id'] }}" data-url="{{ route('backend.cases.checklist', [$case['id'], $item['id']]) }}">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="checklist[]" value="{{ $item['id'] }}"/>
                                    {{ $item['name'] }}

                                    @if($phase->id == $case['phase_id'])
                                        <?php $remaining = $case->checklistRemaining($item) ?>
                                        &nbsp;&nbsp;
                                        @if($remaining > 0)
                                        <small class="label label-success">{{ $remaining }} hari lagi</small>
                                        @else
                                        <small class="label label-danger">lewat {{ abs($remaining) }} hari</small>
                                        @endif
                                    @endif
                                </label>
                            </div>
                        </li>
                    @endif

                @endforeach
            </ul>
            @endforeach
        </div>
    </div>

    </div>

</div>

<div id="ajax-modal" class="modal fade" tabindex="-1" style="display: none;"></div>

@stop


@section('style-head')
    @parent
    <link href="{{ asset('vendor/bootstrap-modal/bootstrap-modal-bs3patch.css') }}" rel="stylesheet" />
    <link href="{{ asset('vendor/bootstrap-modal/bootstrap-modal.css') }}" rel="stylesheet" />
    <link href="{{ asset('vendor/bootstrap-datepicker/css/datepicker3.css') }}" rel="stylesheet"  />

    <style>
        .case-info {font-size: 1.2em;}
        .case-info dd, .case-info dt {line-height: 2em;}
        .list-group-item.item-checklist {
            padding: 1px 10px;
        }
        .fa-check {color: #090}
        .list-group.disabled *{
            opacity: .5;
            cursor: not-allowed;
        }
    </style>
@stop

@if(Auth::check()))

@section('script-end')
    @parent
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>

    <script src="{{ asset('vendor/bootstrap-modal/bootstrap-modalmanager.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap-modal/bootstrap-modal.js') }}"></script>

    <script>
    $(function(){
        var $modal = $('#ajax-modal');
        $('.item-checklist').on('click', function(e){
            e.preventDefault();
            // create the backdrop and wait for next modal to be triggered
            $('body').modalmanager('loading');

            $modal.load($(this).data('url'), '', function(){
                $modal.modal();

                $('#activity-date').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    todayHighlight: true
                });
            });
        });
    });
    </script>
@stop
@endif
