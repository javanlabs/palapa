@extends('dekor::layouts.base')
@section('body')
    <div class="container" style="margin-top: 50px">
        <div class="paper clearfix">
        <div class="text-right" style="padding: 20px">
            <button class="btn btn-default" onclick="javascript:window.close();"><i class="fa fa-times"></i> Tutup Halaman Ini</button>
        </div>

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
