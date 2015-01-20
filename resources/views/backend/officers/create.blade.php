@extends('layouts.admin.admin')

@section('content-admin')
    <div class="container-fluid">
        <h2 class="page-title">Tambah SDM</h2>
        {{ BootForm::open()->action(route('backend.officers.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Nama', 'name') }}
            {{ BootForm::text('NIP', 'nip') }}
            {{ BootForm::select('Pangkat', 'pangkat_id')->options($pangkatLookup) }}
            {{ BootForm::select('Jabatan', 'jabatan_id')->options($jabatanLookup) }}
            {{ BootForm::select('Role', 'role')->options($roles) }}
            {{ BootForm::submit('Simpan', 'btn-primary') }}
        {{ BootForm::close() }}
    </div>
@stop
