@extends('layouts.admin.empty')

@section('trails')
    <div class="trail"><a href="{{ route('backend.cases.show', [$case['id']]) }}"><i class="ion-ios-arrow-back"></i> Kembali</a></div>
@stop

@section('content-admin')
    {{ BootForm::openHorizontal(2,10)->action(route('backend.evidences.store')) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Tambah Barang Bukti</h4>
            <input type='hidden' name='case_id' value='{{$case['id']}}'/>
        </div>
        <div class="panel-body">

            <dl class="dl-horizontal">
                <dt>Kasus</dt>
                <dd>{{ $case['name'] }}</dd>
                <dt>Pasal</dt>
                <dd>{{ $case['pasal'] }}</dd>
                <dt>Tersangka</dt>
                <dd>{{$case?$case->suspectNames():'-'}}</dd>
            </dl>

            <hr/>

            {{ BootForm::textarea('Barang Bukti 1', 'name[]')->rows(3) }}
            {{ BootForm::textarea('Barang Bukti 2', 'name[]')->rows(3) }}
            {{ BootForm::textarea('Barang Bukti 3', 'name[]')->rows(3) }}
            {{ BootForm::textarea('Barang Bukti 4', 'name[]')->rows(3) }}
            {{ BootForm::textarea('Barang Bukti 5', 'name[]')->rows(3) }}
        </div>
        <div class="panel-footer">
            <a class="btn btn-default" href="{{ route('backend.cases.show', [$case['id']]) }}">Batal</a>
            {{ Form::submit('Simpan', ['class' => 'btn btn-primary']) }}
        </div>
    </div>


    {{ BootForm::close() }}

@stop