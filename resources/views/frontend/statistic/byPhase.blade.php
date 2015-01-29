@extends('frontend.statistic.layout')

@section('menu-dashboard')
    @include('frontend.statistic.tab', ['active' => 'byPhase'])
@stop

@section('content-dashboard')

    <div class="panel panel-default">
        <div class="panel-heading">
            Statistik Perkara Berdasar Tahapan Tahun
            @include('frontend.statistic.year')
        </div>

        <div class="pad">
            <div id="chart" style="width: 100%; height: 300px" class="mb"></div>
        </div>

            <div class="panel-heading">Rekapitulasi Bulanan</div>
            <table class="table">
                <thead>
                <tr>
                    <th>Bulan</th>
                    @foreach($stat['series'] as $row)
                        <th>{{ $row['name'] }}</th>
                    @endforeach
                </tr>
                </thead>
                <tbody>
                @foreach($stat['data'] as $row)
                    <tr>
                        <td>{{ $row['month'] }} {{ $row['year'] }}</td>
                        @foreach($stat['series'] as $phase)
                            <td>{{ $row[$phase['name']] }}</td>
                        @endforeach
                    </tr>
                @endforeach
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
    <script src="//cdnjs.cloudflare.com/ajax/libs/globalize/0.1.1/cultures/globalize.culture.id-ID.min.js"></script>
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
            dataSource: {{ json_encode($stat['data']) }},
            series: {{ json_encode($stat['series']) }},
            tooltip: {
                enabled: true,
                format:'fixedPoint'
            }
        });

        $(document).on('change', '#selectType', function(e){
            $('#formType').submit();
        });

    });
    </script>
@stop
