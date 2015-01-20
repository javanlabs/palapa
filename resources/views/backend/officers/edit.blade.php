@extends('layouts.admin.admin')

@section('content-admin')
    <div class="container-fluid">
        <h2 class="page-title">Edit SDM</h2>
        {{ BootForm::open()->put()->action(route('backend.officers.update', [$officer->id])) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Nama', 'name')->value($officer->name) }}
            {{ BootForm::text('NIP', 'nip')->value($officer->nip) }}
            {{ BootForm::select('Pangkat', 'pangkat_id')->options($pangkatLookup)->select($officer->pangkat->getKey()) }}
            {{ BootForm::select('Jabatan', 'jabatan_id')->options($jabatanLookup)->select($officer->jabatan->getKey()) }}
            {{ BootForm::submit('Simpan', 'btn-primary') }}
        {{ BootForm::close() }}
    </div>
@stop
