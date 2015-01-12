@extends('layouts.frontend.frontend')

@section('style-head')
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/bootstrap-datepicker/css/datepicker3.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2.css') }}" />
     <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2-bootstrap.css') }}" />
@stop

@section('content')
    <div class="container-fluid">
        {{ BootForm::open()->put()->action(route('backend.cases.update', [$case->id])) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            <fieldset>
            <h4>Penerimaan SPDP</h4>
            {{ BootForm::text('Nomor SPDP', 'spdp_number')->value($case->spdp_number) }}
            {{ BootForm::text('Tanggal', 'start_date')->addClass('datepicker')->data('provide', 'datepicker')->data('orientation', 'bottom auto')->data('date-today-highlight', 'true')->value($case->start_date) }}
            {{ BootForm::text('Kasus', 'kasus')->value($case->kasus) }}
            {{ BootForm::textarea('Pasal yang disangkakan', 'pasal')->rows(3)->value($case->pasal) }}
            {{ BootForm::text('Penyidik', 'penyidik_id')->value($case->penyidik) }}
            </fieldset>

           

            <fieldset>
            <h4>Penugasan</h4>
            {{ BootForm::select('Jaksa/Penuntut Umum', 'jaksa_id')->options($jaksaLookup)->select($case->jaksa_id) }}
            {{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup)->select($case->staff_id) }}
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
