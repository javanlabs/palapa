@extends('layouts.base')
@section('body')
    @include('layouts.frontend.header')
    <div class="container">
        <div class="col-md-3">
            @include('layouts.frontend.aside')
        </div>
        <div class="col-md-9">
            @yield('content')
        </div>
    </div>
@stop
