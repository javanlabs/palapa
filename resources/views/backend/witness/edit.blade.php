@extends('layouts.admin.empty')

@section('trails')
    <div class="trail"><a href="{{ route('backend.cases.show', [$caseId]) }}"><i class="ion-ios-arrow-back"></i> Kembali</a></div>
@stop

@section('content-admin')
    {{ BootForm::open()->put()->action(route('backend.witness.update', [$suspect['id']])) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
    <input type="hidden" name="case_id" value="{{ $caseId }}"/>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Edit Data Saksi</span></h4>
        </div>
        <div class="panel-body">

            <div class="">{{ BootForm::text('Nama', 'name')->value($suspect['name']) }}</div>

            <div class="row suspect-type individu">
                <div class="col-md-3">
                    {{ BootForm::select('Tempat Lahir', 'pob_id')->options($cities)->select($suspect['pob_id']) }}
                </div>
                <div class="col-md-3">
                    {{ BootForm::text('Tanggal Lahir', 'dob')->addClass('datepicker')->data('provide', 'datepicker')->data('date-start-view', 2)->value($suspect['dob'])->id('dob') }}
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Umur</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="age" value="{{ Input::old('age', $suspect['age']) }}" id="age">
                            <span class="input-group-addon">tahun</span>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    {{ BootForm::select('Jenis Kelamin', 'sex')->options($jenisKelamins)->select($suspect['sex']) }}
                </div>
            </div>

            {{ BootForm::textarea('Alamat', 'address')->rows(3)->value($suspect['address']) }}
            {{ BootForm::select('Kota', 'city_id')->options($cities)->select($suspect['city_id']) }}

            <div class="row suspect-type individu">
                <div class="col-md-3">
                    {{ BootForm::text('Kewarganegaraan', 'nationality')->value($suspect['nationality']) }}
                </div>
                <div class="col-md-3">
                    {{ BootForm::text('Pendidikan', 'education')->value($suspect['education']) }}
                </div>
                <div class="col-md-3">
                    {{ BootForm::text('Pekerjaan', 'job')->value($suspect['job']) }}
                </div>
                <div class="col-md-3">
                    {{ BootForm::select('Agama', 'religion')->options($religions)->select($suspect['religion']) }}
                </div>
            </div>

        </div>
        <div class="panel-footer">
            <a class="btn btn-default" href="{{ route('backend.cases.show', [$caseId]) }}">Batal</a>
            {{ BootForm::submit('Simpan', 'btn-primary') }}
        </div>
    </div>


    {{ BootForm::close() }}

@stop

@section('script-end')
    @parent
    <script>
        $(function(){

            $('#dob').on('change', function(){
                var age = moment().diff(moment($(this).val(), 'DD-MM-YYYY'), 'years');
                $('#age').val(age);
            });
        });
    </script>
@stop