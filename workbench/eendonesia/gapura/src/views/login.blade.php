@extends('dekor::layouts.full')

@section('content')

<div class="container">
    <h2>Login</h2>
    {{ BootForm::open(['action' => route('gapura.login')]) }}
        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
        {{ BootForm::text('Email', 'email') }}
        {{ BootForm::text('Password', 'password') }}
        <div class="row">
            <div class="col-md-6">
                {{ BootForm::submit('Submit', 'btn-primary') }}
            </div>
            <div class="col-md-6 text-right">
                <a href="{{ route('gapura.register') }}">Register</a>
            </div>
        </div>
    {{ BootForm::close() }}
</div>

@stop
