@extends('frontend.statistic.layout')

@section('menu-dashboard')
    @include('frontend.statistic.tab', ['active' => 'byStatus'])
@stop

@section('content-dashboard')

    <div class="panel panel-default">
        <div class="panel-heading">
            Statistik Perbandingan Perkara Baru - Perkara Ditutup Tahun
            @include('frontend.statistic.year')
        </div>

        <div class="pad">
            <div id="chart" style="width: 100%; height: 300px"></div>
        </div>

        <div class="panel-heading">Rekapitulasi Bulanan</div>
        <table class="table table-condensed">
            <thead>
            <tr>
                <th>Bulan</th>
                <th>Perkara Baru</th>
                <th>Perkara Ditutup</th>
            </tr>
            </thead>
            <tbody>
            @foreach($stat as $row)
                <tr>
                    <td>{{ $row['month'] }} {{ $row['year'] }}</td>
                    <td>{{ $row['open'] }}</td>
                    <td>{{ $row['close'] }}</td>
                </tr>
            @endforeach
            <tr></tr>
            </tbody>
        </table>
    </div>


@stop


@section('script-end')
    @parent
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-daterangepicker/moment.js') }}"></script>
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-daterangepicker/daterangepicker.js') }}"></script>

    <script src="{{asset('vendor/chartjs.devexpress/globalize.js')}}"></script>
    <script src="{{asset('vendor/chartjs.devexpress/dx.chartjs.js')}}"></script>
    <script src="{{asset('vendor/globalize.culture.id-ID.min.js')}}"></script>
    <script>
    $(function(){
        Globalize.culture( "id" );

        $("#chart").dxChart({
            commonSeriesSettings: {
                argumentField: "month",
                type:'bar',
                point: {size:2}
            },
            legend: {
                verticalAlignment: "bottom",
                horizontalAlignment: "center"
            },
            valueAxis: [
                {label:{format:'fixedPoint'}},
            ],
            dataSource: {{ json_encode($stat) }},
            series: [
                {
                    valueField: 'open',
                    name: 'Perkara Baru',
                    color: '{{ Config::get('color.green') }}'
                },
                {
                    valueField: 'close',
                    name: 'Perkara Ditutup',
                    color: '{{ Config::get('color.yellow') }}'
                }
            ],
            tooltip: {
                enabled: true,
                format:'fixedPoint'
            }
        });

    });
    </script>
@stop
