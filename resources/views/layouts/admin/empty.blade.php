@extends('layouts.full.full')

@section('body')
    <nav class="navbar navbar-header" role="navigation">
        <div class="container-fluid">
            <div class="col-md-12 trails">
                @yield('trails')
            </div>
        </div>
    </nav>

    <div id="page-admin-empty" class="container" style="width: 800px">
        @yield('content-admin')
    </div>
@stop