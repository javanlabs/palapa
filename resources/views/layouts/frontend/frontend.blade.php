@extends('dekor::layouts.base')

@section('style-head')
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/bootstrap-datepicker/css/datepicker3.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2-bootstrap.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
@stop

@section('body')
    @include('layouts.elements.header')
    <div class="container">
        <div class="col-md-2">
            @include('layouts.frontend.aside')
        </div>
        <div class="col-md-10">
            @yield('content')
        </div>
    </div>
@stop

@section('script-end')
    <script type="text/javascript" src="{{ asset('vendor/select2/select2.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>

    <script>
    $(function(){
        $.fn.datepicker.defaults.format = "yyyy-mm-dd";
        $.fn.datepicker.defaults.autoclose = true;

        $('select').select2();

    });
    </script>

@stop
