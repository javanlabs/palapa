@extends('layouts.admin.empty')

@section('trails')
    <div class="trail"><a href="{{ route('backend.cases.show', [$case['id']]) }}"><i class="ion-ios-arrow-back"></i> Kembali</a></div>
@stop

@section('content-admin')
    {{ BootForm::open()->action(route('backend.cases.member.store', [$case['id']])) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Jaksa Anggota</h4>
        </div>
        <table class="table table-list">
            @foreach($members as $item)
                <tr>
                    <td><i class="ion-person"></i> {{ $item['name'] }}</td>
                </tr>
            @endforeach
        </table>
        <div class="panel-body">
            {{ BootForm::select('Tambah Jaksa', 'officer_id')->options($jaksa) }}
        </div>
        <div class="panel-footer">
            <a class="btn btn-default" href="{{ route('backend.cases.show', [$case['id']]) }}">Batal</a>
            {{ BootForm::submit('Simpan', 'btn-primary') }}
        </div>
    </div>

    {{ BootForm::close() }}

@stop