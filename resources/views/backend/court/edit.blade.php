@extends('layouts.admin.empty')

@section('trails')
    <div class="trail"><a href="{{ route('backend.cases.show', [$case['id']]) }}"><i class="ion-ios-arrow-back"></i> Kembali</a></div>
@stop

@section('content-admin')
    {{ BootForm::open()->put()->action(route('backend.courts.update', [$court['id']])) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Edit Jadwal Sidang</h4>
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

            {{ BootForm::text('Agenda', 'agenda')->value($court['agenda']) }}
            {{ BootForm::text('Tanggal', 'date')->addClass('datepicker')->data('provide', 'datepicker')->value($court['date']) }}
        </div>
        <div class="panel-footer">
            <div class="row">
                <div class="col-md-12 text-center">
                    <a class="btn btn-default" href="{{ route('backend.cases.show', [$case['id']]) }}">Batal</a>
                    {{ BootForm::submit('Simpan', 'btn-primary') }}
                </div>
            </div>
        </div>
    </div>
    {{ BootForm::close() }}

    <div class="text-right">
        {{ Form::delete(route('backend.courts.destroy', $court['id']), '<i class="ion-backspace-outline"></i>   Hapus Jadwal...', ['class' => 'form-delete'], ['class' => 'btn btn-delete btn-link']) }}
    </div>

@stop