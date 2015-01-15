@extends('layouts.full.full')

@section('breadcrumb-title')
    Admin
@stop

@section('content')
    <div class="container-fluid" id="page-admin">
        <div class="col-md-3">

            <aside class="list-group">
                <a class="list-group-item item-primary" href="#" data-toggle="modal" data-target="#modalSelectCase"><i class="fa fa-plus"></i> <strong class="text-uppercase">Register Kasus</strong></a>
                <a class="list-group-item" href="#"><i class="fa fa-legal"></i> Manajemen Kasus</a>
            </aside>
            @include('backend.cases.selectCase')

            <aside class="list-group">
                @if(Auth::guest())
                    <a class="list-group-item" href="{{ route('gapura.login') }}">Login</a>
                @else
                    <a class="list-group-item {{ (isset($page) && $page == 'backend-dashboard')?'active':'' }}" href="{{ route('dashboard.index') }}"><i class="fa fa-area-chart"></i> Statistik</a>
                    <a class="list-group-item {{ (isset($page) && $page == 'backend-officer')?'active':'' }}" href="{{ route('backend.officers.index') }}"><i class="fa fa-users"></i> Manajemen SDM</a>
                    <a class="list-group-item {{ (isset($page) && $page == 'backend-posts')?'active':'' }}" href="/skrip/posts"><i class="fa fa-info"></i> Manajemen Informasi</a>
                    <a class="list-group-item {{ (isset($page) && $page == 'backend-template')?'active':'' }}" href="/backend/templates"><i class="fa fa-file-text-o"></i> Manajemen Template</a>
                    <a class="list-group-item {{ (isset($page) && $page == 'backend-setting')?'active':'' }}" href="{{ route('setting.index') }}"><i class="fa fa-gear"></i> Konfigurasi</a>
                    <a class="list-group-item" href="{{ route('gapura.logout') }}"><i class="fa fa-circle-o-notch"></i> Logout</a>
                @endif

            </aside>
        </div>
        <div class="col-md-9">
            <div style="padding: 0 40px">
                @yield('content-admin')
            </div>
        </div>
    </div>
@stop