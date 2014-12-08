@extends('layouts.base')
@section('body')
    @include('layouts.elements.header')
    <div class="container" style="margin-top: 120px">
        <div class="col-md-3">
            @include('layouts.frontend.aside')
        </div>
        <div class="col-md-9">
            @yield('content')
        </div>
    </div>
@stop
