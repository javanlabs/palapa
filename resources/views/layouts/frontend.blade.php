@extends('layouts.base')
@section('body')
    @include('layouts.elements.header')
    <div>
        @yield('content')
    </div>
    {{--@include('layouts.elements.footer')--}}
@stop
