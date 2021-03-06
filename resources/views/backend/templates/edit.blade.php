@extends('layouts.admin.admin')

@section('style-head')
    @parent
    <link rel="stylesheet" href="{{ asset('vendor/redactor/redactor.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/document.css') }}">
@stop

@section('content-admin')

    <div class="container-fluid hidden-print">
        <div class="editor-f4">
            <h2 class="page-title">{{ $template->title }}</h2>
            {{ BootForm::open()->put()->action(route('backend.templates.update', [$template->id])) }}
                <input type="hidden" name="_token" value="{{ csrf_token() }}"/>                
                {{ BootForm::textarea('Template', 'content', ['id' => 'content'])->value($content) }}
                {{ BootForm::submit('Simpan', 'btn-primary') }}
            {{ BootForm::close() }}
        </div>
    </div>


<div class="modal fade modal-preview hidden-print" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
        <div class="modal-body preview-container preview-f4">

        </div>
        <div class="modal-footer">
            <a class="btn btn-success btn-block btn-print" href="#"><i class="fa fa-print"></i> Print</a>
        </div>
    </div>
  </div>
</div>

<div class="preview-container visible-print-block preview-f4 print-f4"></div>
@stop

@section('script-end')
    @parent
    <script src="{{ asset('vendor/redactor/redactor.min.js') }}"></script>
    <script src="{{ asset('vendor/redactor/plugins/underline.js') }}"></script>
    <script src="{{ asset('vendor/redactor/plugins/table.js') }}"></script>
    <script src="{{ asset('vendor/redactor/plugins/fullscreen.js') }}"></script>
    <script>
        $(function()
        {
            $('#content').redactor({
                minHeight: 400,
                buttonSource: true,
                plugins: ['underline', 'table', 'fullscreen'],
                imageUpload: '/skrip/uploadImage?_token={{ csrf_token() }}',
            });

            $('.preview-container').html($('#content').redactor('code.get'))

            $('#btnPreview').on('click', function (e) {
                e.preventDefault();
                $('.preview-container').html($('#content').redactor('code.get'))
            })

            $('.btn-print').on('click', function (e) {
                e.preventDefault();
                 window.print();
            })

        });
    </script>
@stop
