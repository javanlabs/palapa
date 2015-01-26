@extends('layouts.admin.empty')

@section('trails')
    <div class="trail"><a href="{{ route('backend.officers.show', [$officer['id']]) }}"><i class="ion-ios-arrow-back"></i> Kembali</a></div>
@stop

@section('content-admin')

    {{ BootForm::open()->action(route('backend.user.store')) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Buat Akun Untuk <small>{{ $officer['name'] }}</small></h4>
            <input type='hidden' name='officer_id' value='{{$officer['id']}}'/>
            <input type='hidden' name='name' value='{{$officer['name']}}'/>
        </div>
        <div class="panel-body">
            {{ BootForm::text('Username', 'email') }}
            {{ BootForm::text('Password', 'password') }}
        </div>
        <div class="panel-footer">
            <a class="btn btn-default" href="{{ route('backend.officers.show', [$officer['id']]) }}">Batal</a>
            {{ BootForm::submit('Simpan', 'btn-primary') }}
        </div>
    </div>


    {{ BootForm::close() }}


@stop