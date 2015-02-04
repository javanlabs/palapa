@extends('layouts.full.full')

@section('style-head')
    <style>
        body.login {
            background-image: url("{{ random_wallpaper() }}");
        }
    </style>
@stop

@section('body-class')
login
@stop

@section('breadcrumb')
    <span class="trail">Login</span>
@stop

@section('content')

    <div class="container-fluid" style="margin-top: 90px">
        <div class="col-md-4 col-md-offset-4">
            <div class="panel panel-default pad-lg">
                {{ BootForm::open(['action' => route('gapura.login')]) }}
                <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                {{ BootForm::text('Username', 'email') }}
                {{ BootForm::password('Password', 'password') }}
                {{ BootForm::submit('Login', 'btn-primary btn-block') }}
                {{--<a href="{{ route('gapura.register') }}">Register</a>--}}
                {{ BootForm::close() }}
            </div>
        </div>
    </div>

@stop
