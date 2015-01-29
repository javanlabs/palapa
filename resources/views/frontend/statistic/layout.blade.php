@extends('layouts.full.full')

@section('body-class')
    frontend
@stop

@section('breadcrumb')
    <span class="trail">Statistik</span>
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
