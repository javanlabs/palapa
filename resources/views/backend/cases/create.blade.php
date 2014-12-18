@extends('layouts.frontend.frontend')

@section('style-head')
    @parent
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/bootstrap-datepicker/css/datepicker3.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2-bootstrap.css') }}" />
@stop

@section('content')
{{ BootForm::open()->action(route('backend.cases.store')) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
    <input type="hidden" name="type_id" value="{{ Input::get('type') }}"/>


    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Input Data Kasus: <span class="label label-info">{{ $type['name'] }}</span></h4>
        </div>
        <div class="panel-body">
            @include('backend.cases.form.' . $type['id'])
        </div>
        <div class="panel-footer text-right">
            {{ BootForm::submit('Submit') }}
        </div>
    </div>


{{ BootForm::close() }}

@stop

@section('script-end')
    @parent
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
    <script type="text/javascript" src="{{ asset('vendor/select2/select2.min.js') }}"></script>

    <script>
    $(function(){
        $.fn.datepicker.defaults.format = "yyyy-mm-dd";
        $.fn.datepicker.defaults.autoclose = true;

        $('select').select2();

    });
    </script>
@stop
