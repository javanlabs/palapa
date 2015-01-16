@extends('layouts.full.full')

@section('breadcrumb-title')
    <a href="{{ route('admin.home') }}">Admin</a>
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