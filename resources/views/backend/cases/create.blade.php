@extends('layouts.admin.admin')

@section('content-admin')
{{ BootForm::open()->action(route('backend.cases.store')) }}
    <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
    <input type="hidden" name="type_id" value="{{ Input::get('type') }}"/>


    <h2 class="page-title">Register Kasus <span class="label label-info">{{ $type['name'] }}</span></h2>
    @include('backend.cases.form.' . $type['id'])
    {{ BootForm::submit('Submit', 'btn-primary') }}


{{ BootForm::close() }}

@stop