@extends('layouts.full.full')

@section('breadcrumb-title')
    Admin
@stop

@section('content')
    <div class="container-fluid" id="page-admin">
        <div class="col-md-3">
            <aside class="list-group">
                @if(Auth::check())
                    <a class="list-group-item {{ (isset($page) && $page == 'backend-cases')?'active':'' }}" href="#" data-toggle="modal" data-target="#modalSelectCase"><i class="fa fa-plus"></i> Register Kasus</a>
                    @include('backend.cases.selectCase')
                @endif

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
            @yield('content-admin')
        </div>
    </div>
@stop