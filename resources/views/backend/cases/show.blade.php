@extends('layouts.single')

@section('content')
<div style="padding: 40px">

    <div class="row">
        <div class="col-md-8">
            <h3><i class="fa fa-check-square-o"></i> SOP Checklist</h3>
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
                <dt>Kasus :</dt>
                <dd><p class="lead">{{ $case['name'] }}</p></dd>
                <dt>Tersangka :</dt>
                <dd>{{ $case['suspect_name'] }}</dd>
                <dt>Jaksa :</dt>
                <dd>{{ $case['prosecutor_name'] }}</dd>
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
    </div>
    <div class="col-md-5">
        <div class="panel panel-default">
            @foreach($phases as $phase)
            <div class="panel-heading">{{ $phase['name'] }}</div>
            <ul class="list-group">
                @foreach($phase['checklist'] as $item)

                    @if(in_array($item['id'], $checklistIds))
                        <li class="list-group-item">
                            <div class="checkbox">
                                <i class="fa fa-check"></i>
                                {{ $item['name'] }}
                            </div>
                        </li>
                    @else
                        <li class="list-group-item item-checklist" data-id="{{ $item['id'] }}" data-url="{{ route('backend.cases.activity', [$case['id'], $item['id']]) }}">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="checklist[]" value="{{ $item['id'] }}"/>
                                    {{ $item['name'] }}
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
        .list-group-item {
            padding: 1px 10px;
        }
        .fa-check {color: #090}
    </style>
@stop

@section('script-end')
    @parent
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>

    <script src="{{ asset('vendor/bootstrap-modal/bootstrap-modalmanager.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap-modal/bootstrap-modal.js') }}"></script>

    <script>
    $(function(){
        var $modal = $('#ajax-modal');
        $('.item-checklist').on('click', function(e){

            // create the backdrop and wait for next modal to be triggered
            $('body').modalmanager('loading');

            $modal.load($(this).data('url'), '', function(){
                $modal.modal();

                $('#activity-date').datepicker({
                    format: 'yyyy-mm-dd',
        //            startView: 2,
                    autoclose: true,
                    todayHighlight: true
                });

            });

});

    });
    </script>
@stop
