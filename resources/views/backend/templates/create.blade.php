@extends('layouts.admin.admin')


@section('style-head')
    @parent
    <link rel="stylesheet" href="{{ asset('vendor/redactor/redactor.css') }}" />
@stop

@section('content-admin')
    <div class="container-fluid">
        <h2>Buat Template</h2>
        {{ BootForm::open()->action(route('backend.templates.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::select('Checklist', 'checklist_id')->options($checklists) }}
            {{ BootForm::text('Title', 'title') }}
            {{ BootForm::textarea('Content', 'content', ['id' => 'content']) }}
            {{ BootForm::submit('Simpan') }}
        {{ BootForm::close() }}
    </div>
@stop

@section('script-end')
    @parent
    <script src="{{ asset('vendor/redactor/redactor.min.js') }}"></script>
    <script src="{{ asset('vendor/redactor/plugins/table.js') }}"></script>
    <script src="{{ asset('vendor/redactor/plugins/fullscreen.js') }}"></script>
    <script>

        $(function()
        {        
            $('#content').redactor({
                minHeight: 400,
                plugins: ['table', 'fullscreen'],
                imageUpload: '/skrip/uploadImage?_token={{ csrf_token() }}',                
            });
        });
    </script>
@stop
