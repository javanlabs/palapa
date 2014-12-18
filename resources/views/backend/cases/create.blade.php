@extends('layouts.frontend.frontend')

@section('style-head')
    @parent
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/bootstrap-datepicker/css/datepicker3.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2-bootstrap.css') }}" />
@stop

@section('content')
    <div class="container-fluid">
        {{ BootForm::open()->action(route('backend.cases.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <input type="hidden" name="type_id" value="{{ Input::get('type') }}"/>

            <fieldset>
            <h4>Penerimaan SPDP</h4>
            {{ BootForm::text('Nomor SPDP', 'spdp_number') }}
            {{ BootForm::text('Tanggal', 'start_date')->addClass('datepicker')->data('provide', 'datepicker')->data('orientation', 'bottom auto')->data('date-today-highlight', 'true')->value(date('Y-m-d')) }}
            {{ BootForm::text('Kasus', 'kasus') }}
            {{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3) }}
            {{ BootForm::text('Penyidik', 'penyidik') }}
            </fieldset>

            <fieldset>
            <h4>Data Diri Tersangka</h4>
            {{ BootForm::text('Nama Lengkap', 'suspect_name') }}
            {{ BootForm::select('Tempat Lahir', 'suspect_pob')->options($cities) }}
            {{ BootForm::text('Tanggal Lahir', 'suspect_dob')->addClass('datepicker')->data('provide', 'datepicker')->data('date-start-view', 2) }}
            {{ BootForm::select('Agama', 'suspect_religion')->options($religions) }}
            {{ BootForm::textarea('Alamat', 'suspect_address') }}
            {{ BootForm::select('Kota', 'suspect_city_id')->options($cities) }}
            {{ BootForm::text('Kewarganegaraan', 'suspect_nationality') }}
            {{ BootForm::text('Pendidikan', 'suspect_education') }}
            {{ BootForm::text('Pekerjaan', 'suspect_job') }}
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
