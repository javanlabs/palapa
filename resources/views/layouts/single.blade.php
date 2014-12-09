@extends('dekor::layouts.base')
@section('body')
    <div class="container" style="margin-top: 50px">
        <div class="paper clearfix">
            @yield('content')
        </div>
    </div>
@stop

@section('style-head')
<style>
body {background-color: #f8f8f8}
.paper {
background-color: #fff;
border: 1px solid #eee;
}
</style>
@stop
