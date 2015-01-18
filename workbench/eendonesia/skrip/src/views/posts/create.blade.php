@extends('layouts.admin.admin')

@section('style-head')
    <link rel="stylesheet" href="{{ asset('vendor/redactor/redactor.css') }}" />
@stop

@section('content-admin')
    <div class="container-fluid">
        <h2 class="page-title">Write Post</h2>
        {{ BootForm::open()->action(route('skrip.posts.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Title', 'title') }}
            {{ BootForm::textarea('Content', 'content', ['id' => 'content']) }}
            {{ BootForm::select('Position', 'position')->options($post->getPossiblePosition())}}
            {{ BootForm::select('Status', 'status')->options($post->getPossibleStatus()) }}
            {{ BootForm::submit('Submit') }}
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
