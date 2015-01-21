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
@stop

@section('script-end')
    @parent
    <script src="{{ asset('vendor/select2/select2.min.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap-datepicker/js/bootstrap-datepicker.js') }}"></script>
    <script src="{{ asset('vendor/bootbox.js') }}"></script>

    <script>
        $(function(){
            $.fn.datepicker.defaults.format = "dd-mm-yyyy";
            $.fn.datepicker.defaults.autoclose = true;
            $.fn.datepicker.defaults.todayHighlight = true;

            $('select').select2();


            bootbox.setDefaults({
                locale: "id",
            });
            
            $(document).on('click', '.btn-delete', function(e){
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