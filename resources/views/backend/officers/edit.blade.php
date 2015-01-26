@extends('layouts.admin.admin')

@section('content-admin')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
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
            <div class="col-md-4">
                <div class="panel panel-default">
                    <div class="panel-heading">Manajemen Akun</div>
                    <div class="panel-body">
                        @if($officer->user)
                            <p>Petugas yang bersangkutan lupa password? Klik tombol dibawah ini untuk reset password.</p>
                            <a href="" class="btn btn-info">Reset Password</a>
                            <hr/>
                            <p>Dengan mengklik tombol dibawah ini, maka petugas yang bersangkutan tidak lagi bisa login ke aplikasi. Informasi lainnya tetap akan disimpan di sistem.</p>
                            {{ Form::delete(route('backend.user.destroy', [$officer['id']]), 'Hapus Akun', ['class' => 'form-delete'], ['class' => 'btn btn-danger']) }}
                        @else
                            <p>Petugas ini belum memiliki akun untuk login ke aplikasi.</p>
                            <a href="{{ route('backend.user.create', ['officer_id' => $officer['id']]) }}" class="btn btn-info">Buat Akun</a>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@stop
