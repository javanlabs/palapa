@extends('dekor::layouts.full')

@section('content')

<div class="container">
    <h2>Registration</h2>
    {{ BootForm::open(['action' => route('gapura.register')]) }}
        <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

        {{ BootForm::text('Name', 'name') }}
        {{ BootForm::text('Email', 'email') }}
        {{ BootForm::text('Password', 'password') }}
        {{ BootForm::text('Confirm Password', 'password_confirmation') }}
        <div class="row">
            <div class="col-md-6">
                {{ BootForm::submit('Register', 'btn-primary') }}
            </div>
            <div class="col-md-6 text-right">
                <a href="{{ route('gapura.login') }}">Login</a>
            </div>
        </div>
    {{ BootForm::close() }}
</div>

@stop
