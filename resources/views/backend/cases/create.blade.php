@extends('layouts.admin.admin')

@section('content-admin')
{{ BootForm::open()->action(route('backend.cases.store')) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
    <input type="hidden" name="type_id" value="{{ Input::get('type') }}"/>


    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Register Kasus <span class="label label-info">{{ $type['name'] }}</span></h4>
        </div>
        <div class="panel-body">
            @include('backend.cases.form.' . $type['id'])
        </div>
        <div class="panel-footer text-right">
            {{ BootForm::submit('Submit') }}
        </div>
    </div>


{{ BootForm::close() }}

@stop
