@extends('skrip::layouts.default')

@section('style-head')
    <link rel="stylesheet" href="{{ asset('vendor/redactor/redactor.css') }}" />
@stop

@section('content')
    <div class="container">
        <h2>Write Post</h2>
        {{ BootForm::open()->put()->action(route('skrip.posts.update', [$post->id])) }}
            <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
            {{ BootForm::text('Title', 'title')->value($post->title) }}
            {{ BootForm::textarea('Content', 'content', ['id' => 'content'])->value($post->content) }}
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
