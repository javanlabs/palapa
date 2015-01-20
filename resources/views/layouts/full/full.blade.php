@extends('layouts.base')

@section('body')
    @include('layouts.full.header')
    @yield('content')
@stop

@section('style-head')
    @parent
    <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/bootstrap-datepicker/css/datepicker3.css') }}" />
    <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2.css') }}" />
    <link rel="stylesheet" type="text/css" media="all" href="{{ asset('vendor/select2/select2-bootstrap.css') }}" />
    {{--<link href="{{ asset('vendor/bootstrap-modal/bootstrap-modal-bs3patch.css') }}" rel="stylesheet" />--}}
    {{--<link href="{{ asset('vendor/bootstrap-modal/bootstrap-modal.css') }}" rel="stylesheet" />--}}
@stop

@section('script-end')
    @parent
    <script type="text/javascript" src="{{ asset('vendor/select2/select2.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
    {{--<script src="{{ asset('vendor/bootstrap-modal/bootstrap-modalmanager.js') }}"></script>--}}
    {{--<script src="{{ asset('vendor/bootstrap-modal/bootstrap-modal.js') }}"></script>--}}

    <script>
        $(function(){
            $.fn.datepicker.defaults.format = "dd-mm-yyyy";
            $.fn.datepicker.defaults.autoclose = true;
            $.fn.datepicker.defaults.todayHighlight = true;

            $('select').select2();


            bootbox.setDefaults({
                locale: "id",
                className: "modal-delete"
            });
            $('.btn-delete').on('click', function(e){
                e.preventDefault();
                var btn = $(this);
                bootbox.confirm("Anda yakin ingin menghapus data ini?", function(result) {
                    if(result == true)
                    {
                        btn.parent('form').submit();
                    }
                });
            });

        });
    </script>

@stop