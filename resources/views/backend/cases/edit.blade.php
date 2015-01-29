@extends('layouts.admin.empty')

@section('trails')
    <div class="trail"><a href="{{ route('backend.cases.show', [$case->id]) }}"><i class="ion-ios-arrow-back"></i> Kembali</a></div>
@stop

@section('content-admin')
    {{ BootForm::open()->put()->action(route('backend.cases.update', [$case->id])) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Edit Perkara <span class="label label-info">{{ $type['name'] }}</span></h4>
        </div>
        <div class="panel-body">
            @include('backend.cases.edit.' . $type['id'])
        </div>
        <div class="panel-footer text-center">
            <a class="btn btn-default" href="{{ $case['permalink_edit'] }}">Batal</a>
            {{ BootForm::submit('Simpan', 'btn-primary') }}
        </div>
    </div>


    {{ BootForm::close() }}

@stop
