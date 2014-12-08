@extends('layouts.frontend.frontend')


@section('content')
    <div class="container-fluid">
        <h2>Tambah SDM</h2>
        {{ BootForm::open()->action(route('backend.officers.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Nama', 'name') }}
            {{ BootForm::text('NIP', 'nip') }}
            {{ BootForm::select('Pangkat', 'pangkat_id')->options($pangkatLookup) }}
            {{ BootForm::select('Jabatan', 'jabatan_id')->options($jabatanLookup) }}
            {{ BootForm::submit('Submit') }}
        {{ BootForm::close() }}
    </div>
@stop
