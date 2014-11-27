@extends('layouts.frontend')
@section('content')
    <div class="container" style="margin-top: 100px">
        <div class="row">
            <div class="col-md-8">
                <h2 class="lead">Jumlah kasus harian</h2>
            </div>
            <div class="col-md-4">
                <div class="input-prepend input-group" style="margin-top: 35px">
                    <span class="add-on input-group-addon"><i class="fa fa-calendar"></i></span><input type="text" name="period" id="chartPeriod" value="{{ $from }} - {{ $to }}" class="form-control" />
                </div>
                <div class="checkbox">
                  <label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" checked="checked"> Bandingkan dengan periode sebelumnya
                </label>
                </div>
            </div>
        </div>
        <div id="dailyCase" style="width: 100%; height: 300px"></div>

    </div>
@stop

@section('style-head')
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/bootstrap-daterangepicker/daterangepicker-bs3.css') }}" />
@stop

@section('script-end')
    @parent
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-daterangepicker/moment.js') }}"></script>
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-daterangepicker/daterangepicker.js') }}"></script>

    <script src="{{asset('vendor/chartjs.devexpress/globalize.js')}}"></script>
    <script src="{{asset('vendor/chartjs.devexpress/dx.chartjs.js')}}"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/globalize/0.1.1/cultures/globalize.culture.id-ID.min.js"></script>
    <script>
    $(function(){
        Globalize.culture( "id" );

        $("#dailyCase").dxChart({
            commonSeriesSettings: {
                argumentField: "day",
                type:'line',
                point: {size:2}
            },
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center"
            },
            valueAxis: [
                {label:{format:'fixedPoint'}},
            ],
            dataSource: {!! $data !!},
            series: [
                {
                    valueField: "total_current",
                    name: "Periode Terpilih",
                    color: '{{ Config::get('color.blue-dark') }}'
                },
                {
                    valueField: "total_previous",
                    name: "Periode Sebelumnya",
                    color: '{{ Config::get('color.yellow') }}'
                },
            ],
            tooltip: {
                enabled: true,
                format:'fixedPoint'
            }
        });

        $('#chartPeriod').daterangepicker({
          ranges: {
             'Today': [moment(), moment()],
             'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
             'Last 7 Days': [moment().subtract('days', 6), moment()],
             'Last 30 Days': [moment().subtract('month', 1), moment()],
             'This Month': [moment().startOf('month'), moment().endOf('month')],
             'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
          },
          startDate: "{{ $from }}",
          endDate: "{{ $to }}",
        opens: 'left',
        format: 'YYYY-MM-DD'
        },
        function(from, to){
            $('#formPeriod input[name=from]').val(from.format('YYYY-MM-DD'));
            $('#formPeriod input[name=to]').val(to.format('YYYY-MM-DD'));
            $('#formPeriod').submit();
        });

    });
    </script>
@stop
