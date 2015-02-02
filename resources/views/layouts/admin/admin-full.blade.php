@extends('layouts.full.full')

@section('breadcrumb')
    <span class="trail"><a href="{{ route('admin.home') }}">Backend</a></span>
@stop

@section('breadcrumb-subtitle')
<span class="trail"><i class="fa fa-angle-right"></i></span>
<span class="trail">@yield('breadcrumb-subtitle-text')</span>
@stop

@section('content')
    <div id="page-admin-full">
        @yield('content-admin')
    </div>
@stop