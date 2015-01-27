@extends('layouts.admin.empty')

@section('trails')
    <div class="trail"><a href="{{ route('backend.cases.show', [$case['id']]) }}"><i class="ion-ios-arrow-back"></i> Kembali</a></div>
@stop

@section('content-admin')
    {{ BootForm::open()->action(route('backend.courts.store')) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Buat Jadwal Sidang</h4>
            <input type='hidden' name='case_id' value='{{$case['id']}}'/>
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

            {{ BootForm::text('Agenda', 'agenda') }}
            {{ BootForm::text('Tanggal', 'date')->addClass('datepicker')->data('provide', 'datepicker') }}
        </div>
        <div class="panel-footer">
            <a class="btn btn-default" href="{{ route('backend.cases.show', [$case['id']]) }}">Batal</a>
            {{ BootForm::submit('Simpan', 'btn-primary') }}
        </div>
    </div>


    {{ BootForm::close() }}

@stop