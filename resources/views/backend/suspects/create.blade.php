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
            <div class="row">
                <div class="col-md-3">
                    {{ BootForm::select('Tempat Lahir', 'pob')->options($cities) }}            
                </div>
                <div class="col-md-3">
                    {{ BootForm::text('Tanggal Lahir', 'dob')->addClass('datepicker')->data('provide', 'datepicker')->data('date-start-view', 2) }}            
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Umur</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="age" value="{{ Input::old('age') }}">
                            <span class="input-group-addon">tahun</span>
                        </div>
                    </div>                    
                </div>
                <div class="col-md-3">
                    {{ BootForm::select('Agama', 'religion')->options($religions) }}                    
                </div>
            </div>

            {{ BootForm::textarea('Alamat', 'address')->rows(3) }}
            {{ BootForm::select('Kota', 'city_id')->options($cities) }}
            <div class="row">
                <div class="col-md-4">
                    {{ BootForm::text('Kewarganegaraan', 'nationality') }}            
                </div>
                <div class="col-md-4">
            {{ BootForm::text('Pendidikan', 'education') }}
                    
                </div>
                <div class="col-md-4">
            {{ BootForm::text('Pekerjaan', 'job') }}
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">{{ BootForm::select('Status', 'status')->options($status) }}</div>
                <div class="col-md-6">{{ BootForm::select('Jenis Tahanan', 'jenis_tahanan')->options($jenisTahanan) }}</div>
            </div>
        </div>
        <div class="panel-footer text-right">
            {{ BootForm::submit('Submit') }}
        </div>
    </div>


{{ BootForm::close() }}

@stop