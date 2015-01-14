@extends('layouts.base')
@section('body')
    <div class="container" style="margin-top: 50px">
        <div class="paper clearfix">
            @yield('content')
        </div>
    </div>
@stop

@section('style-head')
    @parent
    <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/bootstrap-datepicker/css/datepicker3.css') }}" />
    <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2.css') }}" />
    <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2-bootstrap.css') }}" />
    <link href="{{ asset('vendor/bootstrap-modal/bootstrap-modal-bs3patch.css') }}" rel="stylesheet" />
    <link href="{{ asset('vendor/bootstrap-modal/bootstrap-modal.css') }}" rel="stylesheet" />
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
@stop

@section('script-end')
    <script type="text/javascript" src="{{ asset('vendor/select2/select2.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap-modal/bootstrap-modalmanager.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap-modal/bootstrap-modal.js') }}"></script>

    <script>
    $(function(){
        $.fn.datepicker.defaults.format = "yyyy-mm-dd";
        $.fn.datepicker.defaults.autoclose = true;

        $('select').select2({width:'element'});

    });
    </script>

@stop
