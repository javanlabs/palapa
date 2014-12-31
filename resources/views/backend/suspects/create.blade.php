@extends('layouts.frontend.frontend')

@section('content')
{{ BootForm::open()->action(route('backend.suspect.store')) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>    

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Tambah Tersangka</span></h4>
            <input type='hidden' name='case_id' value='{{$case_id}}'/>
        </div>
        <div class="panel-body">
            {{ BootForm::text('Nama Lengkap', 'name') }}
            {{ BootForm::select('Tempat Lahir', 'pob')->options($cities) }}
            {{ BootForm::text('Tanggal Lahir', 'dob')->addClass('datepicker')->data('provide', 'datepicker')->data('date-start-view', 2) }}
            {{ BootForm::select('Agama', 'religion')->options($religions) }}
            {{ BootForm::textarea('Alamat', 'address') }}
            {{ BootForm::select('Kota', 'city_id')->options($cities) }}
            {{ BootForm::text('Kewarganegaraan', 'nationality') }}
            {{ BootForm::text('Pendidikan', 'education') }}
            {{ BootForm::text('Pekerjaan', 'job') }}
        </div>
        <div class="panel-footer text-right">
            {{ BootForm::submit('Submit') }}
        </div>
    </div>


{{ BootForm::close() }}

@stop