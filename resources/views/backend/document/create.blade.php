@extends('layouts.single')

@section('style-head')
    <link rel="stylesheet" href="{{ asset('vendor/redactor/redactor.css') }}" />
@stop

@section('content')
    <div class="container">        
        {{ BootForm::open()->action(route('skrip.posts.store')) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>            
            {{ BootForm::textarea($template->title, 'content', ['id' => 'content'])->value($content) }}
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
