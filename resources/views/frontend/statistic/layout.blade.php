@extends('layouts.full.full')

@section('breadcrumb')
    <span class="trail">Statistik</span>
    {{--{{ Form::open(['id' => 'formYear', 'method' => 'GET', 'style' => 'display:inline-block']) }}--}}
    {{--{{ Form::select('year', array_combine(range(date('Y'), date('Y') - 3), range(date('Y'), date('Y') - 3)), $year, ['id' => 'selectYear']) }}--}}
    {{--@if(isset($type))--}}
        {{--{{ Form::hidden('type', $type) }}--}}
    {{--@endif--}}
    {{--{{ Form::close() }}--}}

@stop

@section('content')
    <div class="container-fluid">
        <div class="col-md-3">
            @include('frontend.tab', ['active' => 'statistik'])
        </div>
        <div class="col-md-9" style="padding: 40px">
            <div class="mb">
                @yield('menu-dashboard')
            </div>
            @yield('content-dashboard')
        </div>
    </div>
@stop

@section('script-end')
    @parent
    <script>
        $(function(){

            $(document).on('change', '#selectYear', function(e){
                $('#formYear').submit();
            });

        });
    </script>
@stop
