@extends('layouts.admin.admin')

@section('breadcrumb')
    @parent
    <span class="trail"><i class="fa fa-angle-right"></i></span>
    <span class="trail">Profilku</span>
@stop

@section('content-admin')
    <div class="panel panel-default">
        <div class="panel-heading">Profil {{ $user['name'] }}</div>
        <div class="panel-body">
            <dl>
                <dt>Nama</dt>
                <dd>{{ $user['name'] }}</dd>
                <dt>Username</dt>
                <dd>{{ $user['email'] }}</dd>
            </dl>
        </div>
        <div class="panel-heading">Ganti Password</div>
        <div class="panel-body">
            {{ BootForm::open()->action(route('me.update_password')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::password('Password Lama', 'password_current') }}
            {{ BootForm::text('Password Baru', 'password') }}
            {{ BootForm::text('Konfirmasi Password Baru', 'password_confirmation') }}
            {{ BootForm::submit('Ganti', 'btn-primary') }}
            {{ BootForm::close() }}
        </div>
    </div>
@stop