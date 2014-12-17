@extends('layouts.single')

@section('style-head')
    <link rel="stylesheet" href="{{ asset('vendor/redactor/redactor.css') }}" />
    <style>
        #previewContainer{
            /*margin-top: 20px;*/
            /*padding: 20px;*/
            /*border: 1px solid #eee;*/
            display: none;
        }
    </style>

    <style media="print">
        @page {
            margin-top: -5mm;  /* this affects the margin in the printer settings */
        }
        #previewContainer {
            display: block;
            margin:0;
            padding: 0;
        }

    </style>
@stop

@section('content')


<div class="container-fluid">
    <div class="col-md-10">
        <div style="width:215mm; height:330mm; margin: 0 auto">
            <h2 class="hidden-print">{{ $template->title }}</h2>
            {{ BootForm::open()->action(route('backend.document.store'))->attribute('class', 'hidden-print')->attribute('id', 'formEditor') }}
                <input type="hidden" name="_token" value="{{ csrf_token() }}"/>
                <input type='hidden' name='case_id' value='{{$case->id}}'/>
                <input type='hidden' name='title' value='{{ $title }}'/>
                {{ BootForm::textarea('', 'content', ['id' => 'content'])->value($content) }}
                {{ BootForm::submit('Submit') }}
            {{ BootForm::close() }}

            <div id="previewContainer" class="preview-container"></div>

        </div>
    </div>
    <div class="col-md-2 hidden-print" style="padding-top: 100px">
        <a class="btn btn-primary btn-block btn-save" href="#">Simpan</a>
        <hr />
        <a class="btn btn-default btn-block" href="#" id="btnPreview" data-toggle="modal" data-target=".modal-preview"><i class="fa fa-eye"></i> Preview</a>
        <a class="btn btn-success btn-block btn-print" href="#"><i class="fa fa-print"></i> Print</a>
    </div>
</div>

<div class="modal fade modal-preview hidden-print" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" style="width:210mm; height:330mm; margin: 0 auto">
    <div class="modal-content">
        <div class="modal-body preview-container">

        </div>
        <div class="modal-footer">
            <a class="btn btn-success btn-block btn-print" href="#"><i class="fa fa-print"></i> Print</a>
        </div>
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

            $('.btn-print').on('click', function (e) {
                e.preventDefault();
                $('.preview-container').html($('#content').redactor('code.get'))
                window.print();
            })

            $('.btn-save').on('click', function(e){
                e.preventDefault();
                $('#formEditor').submit();
            });

            $('#btnPreview').on('click', function (e) {
                e.preventDefault();
                $('.preview-container').html($('#content').redactor('code.get'))
            })

        });
    </script>
@stop
