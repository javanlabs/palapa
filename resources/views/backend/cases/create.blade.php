@extends('layouts.frontend.frontend')

@section('content')
    <div class="container-fluid">
        <h2>Input Kasus</h2>
        {{ BootForm::open()->action(route('backend.cases.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>

            <fieldset>
            <h4>SPDP</h4>
            {{ BootForm::text('Nomor SPDP', 'spdp_number') }}
            {{ BootForm::text('Tanggal', 'date') }}
            {{ BootForm::textarea('Kasus', 'kasus') }}
            {{ BootForm::textarea('Pasal yang disangkakan', 'pasal') }}
            </fieldset>

            <fieldset>
            <h4>Data Diri Tersangka</h4>
            {{ BootForm::text('Name', 'suspect_name') }}
            {{ BootForm::text('Tempat Lahir', 'suspect_pob') }}
            {{ BootForm::text('Tanggal Lahir', 'suspect_dob') }}
            {{ BootForm::text('Agama', 'suspect_religion') }}
            {{ BootForm::textarea('Alamat', 'suspect_address') }}
            {{ BootForm::select('Kota', 'suspect_city_id')->options(['Sragen']) }}
            </fieldset>

            <fieldset>
            <h4>Penugasan</h4>
            {{ BootForm::select('Jaksa/Penuntut Umum', 'jaksa_id')->options($jaksaLookup) }}
            {{ BootForm::select('Staff Administrasi', 'staff_id')->options($staffLookup) }}
            </fieldset>

            {{ BootForm::submit('Submit') }}
        {{ BootForm::close() }}
    </div>
@stop
