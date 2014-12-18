@extends('layouts.frontend.frontend')

@section('style-head')
    <link rel="stylesheet" href="{{ asset('vendor/redactor/redactor.css') }}" />
@stop

@section('content')
    <div class="container-fluid">
        <h2>Ubah Template</h2>
        {{ BootForm::open()->put()->action(route('backend.templates.update', [$template->id])) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::select('Checklist', 'checklist_id')->options($checklists)->select($template->checklist_id) }}
            {{ BootForm::text('Title', 'title')->value($template->title) }}
            {{ BootForm::textarea('Content', 'content', ['id' => 'content'])->value($template->content) }}
            {{ BootForm::submit('Simpan') }}
        {{ BootForm::close() }}
    </div>
@stop

@section('script-end')
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
