@extends('layouts.single')

@section('style-head')
    <link rel="stylesheet" href="{{ asset('vendor/redactor/redactor.css') }}" />
    <style>
        #previewContainer{
            margin-top: 20px;
            padding: 20px;
            border: 1px solid #eee;
        }
    </style>

    <style media="print">
        #previewContainer {
            border: 0 none;
        }
    </style>
@stop

@section('content')


<div role="tabpanel" style="width:210mm; height:330mm; margin: 0 auto">

    <!-- Nav tabs -->
    <ul class="nav nav-tabs nav-justified hidden-print" role="tablist" style="margin-bottom: 20px">
        <li role="presentation" class="active"><a href="#editor" aria-controls="home" role="tab" data-toggle="tab">Editor</a></li>
        <li role="presentation"><a id="tabPreview" href="#preview" aria-controls="profile" role="tab" data-toggle="tab">Preview</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="editor">
            {{ BootForm::open()->action(route('backend.document.store')) }}
                <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                <input type='hidden' name='case_id' value='{{$case->id}}'/>
                {{ BootForm::textarea($template->title, 'content', ['id' => 'content'])->value($content) }}
                {{ BootForm::submit('Submit') }}
            {{ BootForm::close() }}
        </div>
        <div role="tabpanel" class="tab-pane" id="preview">
            <div class="text-right hidden-print">
                <a class="btn btn-primary" href="#" onclick="javascript:window.print()"><i class="fa fa-print"></i> Print</a>
            </div>
            <div id="previewContainer"></div>
        </div>
    </div>

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
                buttonSource: true,
                plugins: ['table', 'fullscreen'],
                imageUpload: '/skrip/uploadImage?_token={{ csrf_token() }}',
            });

            $('#tabPreview').on('shown.bs.tab', function (e) {
                $('#previewContainer').html($('#content').redactor('code.get'))
            })
        });
    </script>
@stop
