@extends('dekor::layouts.base')
@section('body')
    @include('layouts.elements.header')
    <div class="container" style="margin-top: 120px">
        <div class="col-md-2">
            @include('layouts.frontend.aside')
        </div>
        <div class="col-md-10">
            @yield('content')
        </div>
    </div>
@stop
