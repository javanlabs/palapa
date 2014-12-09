@extends('layouts.frontend.frontend')

@section('style-head')
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/bootstrap-datepicker/css/datepicker3.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2-bootstrap.css') }}" />
@stop

@section('content')
    <div class="container-fluid">
        <h2>Input Kasus</h2>
        {{ BootForm::open()->action(route('backend.cases.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

            <fieldset>
            <h4>SPDP</h4>
            {{ BootForm::text('Nomor SPDP', 'spdp_number') }}
            {{ BootForm::text('Tanggal', 'date')->addClass('datepicker')->data('provide', 'datepicker')->data('orientation', 'bottom auto') }}
            {{ BootForm::textarea('Kasus', 'kasus') }}
            {{ BootForm::textarea('Pasal yang disangkakan', 'pasal') }}
            </fieldset>

            <fieldset>
            <h4>Data Diri Tersangka</h4>
            {{ BootForm::text('Name', 'suspect_name') }}
            {{ BootForm::select('Tempat Lahir', 'suspect_pob')->options($cities) }}
            {{ BootForm::text('Tanggal Lahir', 'suspect_dob')->addClass('datepicker')->data('provide', 'datepicker') }}
            {{ BootForm::select('Agama', 'suspect_religion')->options($religions) }}
            {{ BootForm::textarea('Alamat', 'suspect_address') }}
            {{ BootForm::select('Kota', 'suspect_city_id')->options($cities) }}
            </fieldset>

            <fieldset>
            <h4>Penugasan</h4>
            {{ BootForm::select('Jaksa/Penuntut Umum', 'jaksa_id')->options($jaksaLookup) }}
            {{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup) }}
            </fieldset>

            {{ BootForm::submit('Submit') }}
        {{ BootForm::close() }}
    </div>
@stop

@section('script-end')
    @parent
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
    <script type="text/javascript" src="{{ asset('vendor/select2/select2.min.js') }}"></script>

    <script>
    $(function(){
        $.fn.datepicker.defaults.format = "yyyy-mm-dd";
        $.fn.datepicker.defaults.autoclose = true;
//        $('.datepicker').datepicker({
//            format: 'yyyy-mm-dd',
//            startView: 2,
//            autoclose: true,
//            todayHighlight: true
//        });

        $('select').select2();

    });
    </script>
@stop
