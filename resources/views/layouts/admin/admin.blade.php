@extends('layouts.full.full')

@section('breadcrumb')
    <span class="trail"><a href="{{ route('admin.home') }}">Admin</a></span>
@stop

@section('content')
    <div class="container-fluid" id="page-admin">
        <div class="col-md-3">

            <aside class="list-group">
                <a class="list-group-item item-primary" href="#" data-toggle="modal" data-target="#modalSelectCase"><i class="fa fa-plus"></i> <strong class="text-uppercase">Register Kasus</strong></a>
                <a class="list-group-item" href="{{ route('backend.cases.index') }}"><i class="fa fa-legal"></i> Manajemen Perkara</a>
                <a class="list-group-item" href="{{ route('backend.cases.index') }}?owner=me"><i class="fa fa-legal"></i> Perkara Saya </a>
            </aside>
            @include('backend.cases.selectCase')

            <aside class="list-group">
                @if(Auth::guest())
                    <a class="list-group-item" href="{{ route('gapura.login') }}"><i class="fa fa-sign-in"></i> Login</a>
                @else
                    @if(Auth::user()->hasGroup('root'))
                    <a class="list-group-item" href="{{ route('backend.officers.index') }}"><i class="fa fa-users"></i> Manajemen SDM</a>
                    <a class="list-group-item" href="/skrip/posts"><i class="fa fa-info"></i> Halaman Informasi</a>
                    <a class="list-group-item" href="{{ route('backend.templates.index') }}"><i class="fa fa-file-text-o"></i> Template Surat</a>
                    <a class="list-group-item" href="{{ route('moderator.users.index') }}"><i class="ion-person fa"></i> Manajemen Pengguna</a>
                    <a class="list-group-item" href="{{ route('moderator.permissions.index') }}"><i class="ion-key fa"></i> ACL</a>
                    <a class="list-group-item" href="{{ route('backend.files.index') }}"><i class="fa fa-folder-o"></i> File Manager</a>
                    <a class="list-group-item" href="{{ route('setting.index') }}"><i class="fa fa-gear"></i> Konfigurasi</a>
                    @endif
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