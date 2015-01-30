@extends('layouts.admin.empty')

@section('trails')
    <div class="trail"><a href="{{ route('backend.cases.show', [$case['id']]) }}"><i class="ion-ios-arrow-back"></i> Kembali</a></div>
@stop

@section('content-admin')
    {{ BootForm::open()->put()->action(route('backend.evidences.update', [$evidence['id']])) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Edit Barang Bukti</h4>
        </div>
        <div class="panel-body">

            <dl class="dl-horizontal">
                <dt>Kasus</dt>
                <dd>{{ $case['name'] }}</dd>
                <dt>Pasal</dt>
                <dd>{{ $case['pasal'] }}</dd>
                <dt>Tersangka</dt>
                <dd>{{ $case->suspectNames() }}</dd>
            </dl>

            <hr/>

            {{ BootForm::text('Barang Bukti', 'name')->value($evidence['name']) }}
        </div>
        <div class="panel-footer">
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4 text-center">
                    <a class="btn btn-default" href="{{ route('backend.cases.show', [$case['id']]) }}">Batal</a>
                    {{ BootForm::submit('Simpan', 'btn-primary') }}
                </div>
                <div class="col-md-4 text-right">
                    {{ Form::delete(route('backend.evidences.destroy', $evidence['id']), 'Hapus', ['class' => 'form-delete'], ['class' => 'btn btn-delete btn-danger']) }}
                </div>
            </div>
        </div>
    </div>


    {{ BootForm::close() }}

@stop